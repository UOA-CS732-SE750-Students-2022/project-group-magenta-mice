#include "participant_socket.h"

#include <protocol/exchange.pb.h>

namespace Sim::Net
{
    ParticipantSession::ParticipantSession(std::optional<tcp::socket>&& socket) : mSocket(std::move(socket))
    {
        mParser = std::make_unique<MessageParser>(*this);
    }

    void ParticipantSession::injectParser(std::unique_ptr<IMessageParser> parser) { mParser = std::move(parser); }

    void ParticipantSession::start(message_handler&& on_message, error_handler&& on_error)
    {
        this->mOnMessage = std::move(on_message);
        this->mOnError = std::move(on_error);

        Protocol::InsertOrderRequest req;
        req.set_clientid(1);
        req.set_instrumentid(2);
        req.set_price(100);
        req.set_volume(12);
        req.set_side(Protocol::InsertOrderRequest::SELL);
        req.set_lifespan(Protocol::InsertOrderRequest::FAK);

        std::string msg;
        req.SerializeToString(&msg);

        sendMessage(Protocol::INSERT_ORDER, msg);

        asyncRead();
    }

    void ParticipantSession::sendMessage(int messageType, std::string const& message)
    {
        bool idle = mOutgoing.empty();

        void* msg = malloc(message.size());
        strcpy(static_cast<char*>(msg), message.c_str());

        auto header = new Header{
            .mMessageType = messageType,
            .mMessageSize = static_cast<int32_t>(message.size()),
        };

        mOutgoing.emplace(SmartBuffer(
            new io::mutable_buffer(static_cast<void*>(header), sizeof(header)), [header](io::mutable_buffer* buffer) {
                delete header;
                delete buffer;
            }));

        mOutgoing.emplace(SmartBuffer(new io::mutable_buffer(msg, message.size()), [msg](io::mutable_buffer* buffer) {
            free(msg);
            delete buffer;
        }));

        if (idle)
        {
            asyncWrite();
        }
    }

    void ParticipantSession::asyncRead()
    {
        io::async_read_until(
            *mSocket, mStreamBuf, "\n", [self = shared_from_this()](error_code error, std::size_t bytes_transferred) {
                self->onRead(error, bytes_transferred);
            });
    }

    void ParticipantSession::onRead(error_code error, std::size_t bytes_transferred)
    {
        if (!error)
        {
            std::stringstream message;
            message << mSocket->remote_endpoint(error) << ": " << std::istream(&mStreamBuf).rdbuf();
            mStreamBuf.consume(bytes_transferred);

            // todo parse properly
            mOnMessage(1, message.str());

            asyncRead();
        }
        else
        {
            mSocket->close(error);
            mOnError();
        }
    }

    void ParticipantSession::asyncWrite()
    {
        const auto buffer = *mOutgoing.front();

        io::async_write(*mSocket, buffer, [self = shared_from_this()](error_code error, std::size_t bytes) {
            self->onWrite(error, bytes);
        });
    }

    void ParticipantSession::onWrite(error_code error, std::size_t bytes_transferred)
    {
        if (!error)
        {
            mOutgoing.pop();

            if (!mOutgoing.empty())
            {
                asyncWrite();
            }
        }
        else
        {
            mSocket->close(error);
            mOnError();
        }
    }

} // namespace Sim::Net
