#include "exchange_runtime.h"

namespace Sim::Net
{
    void ExchangeRuntime::startServer(std::shared_ptr<io::io_context> ioContext)
    {
        mServer.io_service = ioContext;

        std::promise<unsigned short> server_port;
        std::thread server_thread([this, &server_port]() {
            // Start server
            mServer.start([&server_port](unsigned short port) { server_port.set_value(port); });
        });

        ioContext->run();

        std::cout << "Server listening on port " << server_port.get_future().get() << std::endl << std::endl;
        server_thread.join();
    }

    void ExchangeRuntime::accept(std::shared_ptr<WsServer::Connection> connection)
    {
        std::cout << "Server: Opened connection " << connection.get() << std::endl;

        const auto& loginResponseInstruments = mExchange.getExchangeInstruments();

        auto client =
            std::make_shared<Participant>(std::make_unique<OrderFactory>(), loginResponseInstruments, mDb, mConfig);

        const auto messageHandler = [this, weak = std::weak_ptr(connection)](
                                        int type, const std::string& protobuf) -> void {
            if (auto shared = weak.lock(); shared)
            {
                this->sendMessage(*shared, type, protobuf);
            }
            else
            {
                std::cout << "Error locking client" << std::endl;
            }
        };
        const auto errorHandler = [weak = std::weak_ptr(connection)](const std::string& message) -> void {
            if (auto shared = weak.lock(); shared)
            {
                shared->send_close(1000, message);
            }
            else
            {
                std::cout << "Error locking client" << std::endl;
            }
        };

        client->setMessageSender(messageHandler);
        client->setErrorHandler(errorHandler);

        mExchange.addParticipant(client);
        mParticipantSockets.emplace(connection, client);
    }

    void ExchangeRuntime::handleMessage(WsConnection connection, WsMessage message)
    {
        auto data = std::make_unique<char[]>(HEADER_SIZE);
        message->read(data.get(), 4);
        int* typePtr = reinterpret_cast<int*>(data.get());
        int type = *typePtr;

        std::cout << "Server: Received message type: " << type << std::endl;

        auto sz = message->size();
        auto payloadRaw = std::make_unique<char[]>(sz);
        message->read(payloadRaw.get(), sz);

        auto& sender = mParticipantSockets.at(connection);

        if (!sender->isLoggedIn())
        {
            switch (type)
            {
            case Protocol::LOGIN: {
                Protocol::LoginRequest loginRequest;
                if (!loginRequest.ParseFromString(payloadRaw.get()))
                {
                    sender->raiseError("Invalid login message type.");
                    return;
                }

                const auto& key = loginRequest.key();

                if (key == mConfig.getMarketMakerKey())
                {
                    sender->upgrade();
                }
                else
                {
                    const auto& loginUserId = checkKey(key);
                    if (!loginUserId.has_value())
                    {
                        sender->raiseError("Invalid login key.");
                        return;
                    }

                    // the userId is not used by market maker participants
                    sender->login(*loginUserId);
                }

                sendMessage(
                    *connection, Protocol::LOGIN_RESPONSE, mExchange.getExchangeInstruments().SerializeAsString());

                break;
            }
            default: {
                sender->raiseError("Cannot send that message type before logging in.");
            }
            }
        }
        else
        {
            switch (type)
            {
            case Protocol::LOGIN: {
                sender->raiseError("Cannot login, already logged in.");
                break;
            }
            case Protocol::LOGOUT: {
                Protocol::LogoutRequest logoutRequest;
                logoutRequest.ParseFromString(payloadRaw.get());
                sender->raiseError("Logging out now.");
                break;
            }
            case Protocol::INSERT_ORDER: {
                Protocol::InsertOrderRequest insertOrderRequest;
                insertOrderRequest.ParseFromString(payloadRaw.get());
                sender->requestOrderInsert(insertOrderRequest);
                break;
            }
            case Protocol::CANCEL_ORDER: {
                Protocol::CancelOrderRequest cancelOrderRequest;
                cancelOrderRequest.ParseFromString(payloadRaw.get());
                sender->requestOrderCancel(cancelOrderRequest);
                break;
            }
            case Protocol::AMEND_ORDER: {
                throw std::runtime_error("Amend order not implemented");
                // Protocol::AmendOrderRequest amendOrderRequest;
                // amendOrderRequest.ParseFromString(message);
                break;
            }
            default: {
                sender->raiseError("Invalid message type from client.");
            }
            }
        }
    }

    void ExchangeRuntime::sendMessage(WsServer::Connection& connection, int32_t type, const std::string& payload)
    {
        auto out = std::make_shared<SimpleWeb::SocketServerBase<SimpleWeb::WS>::OutMessage>();

        out->write(reinterpret_cast<char*>(&type), 4);
        out->write(payload.data(), payload.size());

        connection.send(out, nullptr, BINARY_MODE);
    }

    std::optional<std::string> ExchangeRuntime::checkKey(const std::string& key)
    {
        return mDb.checkKey(key, this->mConfig.getExchangeId());
    }

    void ExchangeRuntime::messageAll(int32_t messageType, const std::string& message)
    {
        for (auto& [connection, participant] : mParticipantSockets)
        {
            if (participant->isLoggedIn())
            {
                sendMessage(*connection, messageType, message);
            }
        }
    }

    void ExchangeRuntime::sendPriceFeed()
    {
        auto priceFeed = mExchange.getFeed();
        messageAll(Protocol::EXCHANGE_FEED, priceFeed.SerializeAsString());
    }

    void ExchangeRuntime::addInstrument(Instrument instrument) { mExchange.addInstrument(instrument); }

    void ExchangeRuntime::diagnose()
    {
        mExchange.applyToAllParticipants([](Participant& participant) { participant.diagnose(); });
    }

} // namespace Sim::Net
