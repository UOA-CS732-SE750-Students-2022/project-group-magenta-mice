#pragma once

#include <boost/asio.hpp>
#include <common/timer.h>
#include <common/types.h>
#include <config/config.h>
#include <db/connection.h>
#include <engine/exchange.h>
#include <engine/participant.h>
#include <net/participant_socket.h>
#include <optional>
#include <queue>
#include <unordered_set>

namespace io = boost::asio;
using tcp = io::ip::tcp;
using error_code = boost::system::error_code;
using namespace std::placeholders;

using message_handler = std::function<void(std::string)>;
using error_handler = std::function<void()>;

namespace Sim::Net
{
    class ExchangeServer
    {
       public:
        ExchangeServer(io::io_context& io_context, Config::ExchangeConfig& config, Db::Connection& db);

        void addInstrument(Instrument instrument);

        void acceptSocket();

        void messageAll(int32_t messageType, std::string const& message);
        void sendPriceFeed();

        const Exchange& getExchange() const;

        void diagnose();

       private:
        Exchange mExchange;
        Db::IConnection& mDb;

        io::io_context& mIoContext;
        tcp::acceptor mAcceptor;
        std::optional<tcp::socket> mSocket;
        const std::string& mExchangeId;

        const Config::ExchangeConfig& mConfig;
    };
} // namespace Sim::Net
