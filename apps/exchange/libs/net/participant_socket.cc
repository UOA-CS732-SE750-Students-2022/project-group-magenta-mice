#include "participant_socket.h"

#include <protocol/exchange.pb.h>

namespace Sim::Net
{
    ParticipantSession::ParticipantSession(
        std::optional<tcp::socket>&& socket,
        Protocol::LoginResponse response,
        Db::IConnection& connection)
        : mSocket(std::move(socket)), mLoginResponse{ response }, mFSM{ ParticipantFSM::CONNECTED }, mDb{ connection }
    {}

    void ParticipantSession::injectParser(std::unique_ptr<IMessageParser> parser) { mParser = std::move(parser); }

    bool ParticipantSession::isLoggedIn() const { return mFSM == ParticipantFSM::LOGGED_IN; }

    void ParticipantSession::login(std::string userId)
    {
        mFSM = ParticipantFSM::LOGGED_IN;
        mUserId = userId;
    }

    void ParticipantSession::logout() { mFSM = ParticipantFSM::CONNECTED; }

    void ParticipantSession::raiseError(std::string errorMessage) const
    {
        if (mOnError)
        {
            mOnError(errorMessage);
        }
    }

    void ParticipantSession::start(
        message_handler&& on_message,
        error_handler&& on_error,
        std::unique_ptr<IMessageParser> parser)
    {
        this->mParser = std::move(parser);
        this->mOnMessage = std::move(on_message);
        this->mOnError = std::move(on_error);

        // Protocol::InsertOrderRequest req;
        // req.set_clientid(1);
        // req.set_instrumentid(2);
        // req.set_price(100);
        // req.set_volume(12);
        // req.set_side(Protocol::InsertOrderRequest::SELL);
        // req.set_lifespan(Protocol::InsertOrderRequest::FAK);

        // std::string msg;
        // req.SerializeToString(&msg);

        // sendMessage(Protocol::INSERT_ORDER, msg);

        asyncRead();
    }

    void ParticipantSession::sendMessage(int messageType, std::string const& message)
    {
        bool idle = mOutgoing.empty();

        void* msg = malloc(message.size());
        strcpy(static_cast<char*>(msg), message.c_str());

        std::cout << "{ Size: " << message.size() << ", Type: " << messageType << " }" << std::endl;

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
        io::async_read(
            *mSocket,
            mStreamBuf,
            io::transfer_exactly(8),
            [self = shared_from_this()](
                error_code error, std::size_t bytes_transferred) { self->onRead(error, bytes_transferred); });
    }

    void ParticipantSession::onRead(error_code error, std::size_t bytes_transferred)
    {
        if (!error)
        {
            std::istream stream(&mStreamBuf);

            char* buf = new char[bytes_transferred];
            stream.read(buf, bytes_transferred);
            Header* header = reinterpret_cast<Header*>(buf);
            mStreamBuf.consume(bytes_transferred);

            io::async_read(
                *mSocket,
                mStreamBuf,
                io::transfer_exactly(header->mMessageSize),
                [self = shared_from_this(), header, buf](error_code error, std::size_t bytes_transferred) {
                    std::stringstream message;
                    message << std::istream(&self->mStreamBuf).rdbuf();
                    self->mStreamBuf.consume(bytes_transferred);

                    self->mParser->parseMessage(header->mMessageType, message.str());

                    delete[] buf;

                    self->asyncRead();
                });
        }
        else
        {
            mSocket->close(error);
            mOnError("Socket read error: " + error.message());
        }
    }

    void ParticipantSession::asyncWrite()
    {
        const auto buffer = *mOutgoing.front();
        if (mOutgoing.size() == 2)
        {
            std::cout << "Writing header with " << buffer.size() << " bytes" << std::endl;
            std::cout << "Header data size: " << ((Header*)buffer.data())->mMessageSize
                      << ", type: " << ((Header*)buffer.data())->mMessageType << std::endl;
        }
        else
        {
            std::cout << "Writing payload with " << buffer.size() << " bytes" << std::endl;
            auto chars = ((char*)buffer.data());
            Protocol::ExchangeFeed feed;
            feed.ParseFromString(chars);

            std::cout << "Payload data is " << feed.DebugString() << std::endl;
        }

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
            mOnError("Socket write error: " + error.message());
        }
    }

} // namespace Sim::Net
