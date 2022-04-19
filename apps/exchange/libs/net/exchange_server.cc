#include "exchange_server.h"

namespace Sim::Net
{
    ExchangeServer::ExchangeServer(io::io_context& io_context, std::uint16_t port)
        : mExchange(std::make_unique<ParticipantManager>(), std::make_unique<OrderbookManager>()),
          mIoContext(io_context),
          mAcceptor(io_context, tcp::endpoint(tcp::v4(), port))
    {}

    void ExchangeServer::acceptSocket()
    {
        mSocket.emplace(mIoContext);
        auto loginResponseInstruments = mExchange.getExchangeInstruments();

        mAcceptor.async_accept(*mSocket, [&, loginResponseInstruments](error_code error) {
            auto client = std::make_shared<Participant>(
                std::make_unique<OrderFactory>(), std::move(*mSocket), loginResponseInstruments);

            mExchange.addParticipant(client);

            client->start(
                [this](int32_t messageType, std::string const& message) {
                    // on_message(messageType, message);
                    (void)this;
                },
                [this, weak = std::weak_ptr(client)](std::string message) {
                    if (auto shared = weak.lock(); shared && mExchange.removeParticipant(shared))
                    {
                        std::cout << "Client error: " << message << std::endl;
                    }
                    else
                    {
                        std::cout << "Error locking and removing client" << std::endl;
                    }
                });

            acceptSocket();
        });
    }

    void ExchangeServer::messageAll(int32_t messageType, std::string const& message)
    {
        mExchange.applyToAllParticipants(
            [&messageType, &message](Participant& participant) { participant.sendMessage(messageType, message); });
    }

    void ExchangeServer::sendPriceFeed()
    {
        const auto& feed = mExchange.getFeed();
        messageAll(Protocol::EXCHANGE_FEED, feed.SerializeAsString());
    }

    const Exchange& ExchangeServer::getExchange() const { return mExchange; }

    void ExchangeServer::addInstrument(Instrument instrument) { mExchange.addInstrument(instrument); }

    void ExchangeServer::diagnose()
    {
        mExchange.applyToAllParticipants([](Participant& participant) { participant.diagnose(); });
    }
} // namespace Sim::Net