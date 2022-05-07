#pragma once

#include <common/colors.h>
#include <db/connection.h>
#include <engine/exchange.h>
#include <engine/participant.h>
#include <future>
#include <iostream>
#include <memory>
#include <unordered_map>
#include <wss/server_ws.hpp>

namespace Sim::Net
{
    static const size_t HEADER_SIZE = 4;
    static const size_t BINARY_MODE = 130;

    namespace io = boost::asio;

    class ExchangeRuntime
    {
        using WsServer = SimpleWeb::SocketServer<SimpleWeb::WS>;
        using WsConnection = std::shared_ptr<WsServer::Connection>;
        using WsMessage = std::shared_ptr<WsServer::InMessage>;

       public:
        ExchangeRuntime(const Config::ExchangeConfig& config, Db::Connection& db)
            : mExchange(std::make_unique<ParticipantManager>(), std::make_unique<OrderbookManager>()),
              mDb(db),
              mConfig(config)
        {
            mServer.config.port = config.getPort();
            auto& endpoint = mServer.endpoint["^/"];

            endpoint.on_open = [this](WsConnection connection) { this->accept(std::move(connection)); };

            endpoint.on_message = [this](WsConnection connection, WsMessage message) {
                this->handleMessage(connection, message);
            };

            endpoint.on_close = [this](WsConnection connection, int status, const std::string& reason) {
                std::cout << "Closing connection" << std::endl;

                auto participant = this->mParticipantSockets.at(connection);

                this->mExchange.removeParticipant(participant);
                this->mParticipantSockets.erase(connection);
            };

            endpoint.on_error = [this](WsConnection connection, const SimpleWeb::error_code& error) {
                using Sim::Common::RED;
                using Sim::Common::RESET;

                std::cout << RED << "Socket Error: " << error.category().name() << RESET << std::endl;
                std::cout << RED << "Socket Error: " << error.message() << RESET << std::endl;
                std::cout << RED << "Socket Error: Clearing Participant" << RESET << std::endl;

                auto participant = this->mParticipantSockets.at(connection);

                this->mExchange.removeParticipant(participant);
                this->mParticipantSockets.erase(connection);
            };
        }

        void startServer(std::shared_ptr<io::io_context> ioContext);

        void addInstrument(Instrument instrument);

        void accept(WsConnection connection);

        void handleMessage(WsConnection connection, WsMessage message);
        void sendMessage(WsServer::Connection& connection, int32_t type, const std::string& payload);
        void messageAll(int32_t messageType, const std::string& message);

        const Exchange& getExchange() const { return mExchange; }
        decltype(auto) getIoContext() { return mServer.io_service; }

        void sendPriceFeed();
        void diagnose();

        std::optional<std::string> checkKey(const std::string& key);

       private:
        WsServer mServer;
        Exchange mExchange;

        std::unordered_map<WsConnection, std::shared_ptr<Participant>> mParticipantSockets;

        Db::IConnection& mDb;
        const Config::ExchangeConfig& mConfig;
    };
} // namespace Sim::Net
