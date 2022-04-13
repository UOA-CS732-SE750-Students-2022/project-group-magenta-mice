#pragma once

#include "message_parsing.h"

#include <boost/asio.hpp>
#include <functional>
#include <optional>
#include <protocol/exchange.pb.h>
#include <queue>
#include <tuple>
#include <unordered_set>

namespace Sim::Net
{
    namespace io = boost::asio;
    using tcp = io::ip::tcp;
    using error_code = boost::system::error_code;
    using namespace std::placeholders;

    using message_handler = std::function<void(int32_t, std::string)>;
    using error_handler = std::function<void(std::string message)>;

    struct IMessageParser;

    struct Header
    {
        int32_t mMessageType;
        int32_t mMessageSize;
    };

    enum class ParticipantFSM
    {
        CONNECTED,
        LOGGED_IN
    };

    using SmartBuffer = std::unique_ptr<io::mutable_buffer, std::function<void(io::mutable_buffer*)>>;

    struct ISession
    {
        virtual ~ISession() = default;

        virtual const Protocol::LoginResponse& getLoginResponse() const = 0;

        virtual void sendMessage(int messageType, std::string const& message) = 0;

        virtual bool requestOrderInsert(Protocol::InsertOrderRequest& order) = 0;
        virtual bool requestOrderCancel(Protocol::CancelOrderRequest& order) = 0;

        virtual void raiseError(std::string errorMessage) const = 0;

        virtual bool isLoggedIn() const = 0;
        virtual void login() = 0;
        virtual void logout() = 0;
    };

    class ParticipantSession : public std::enable_shared_from_this<ParticipantSession>, public ISession
    {
       public:
        ParticipantSession(std::optional<tcp::socket>&& socket, Protocol::LoginResponse loginResponse);
        virtual ~ParticipantSession() = default;

        void injectParser(std::unique_ptr<IMessageParser> parser);
        const Protocol::LoginResponse& getLoginResponse() const { return mLoginResponse; }

        void start(message_handler&& on_message, error_handler&& on_error);
        void sendMessage(int messageType, std::string const& message);

        virtual bool requestOrderInsert(Protocol::InsertOrderRequest& order) = 0;
        virtual bool requestOrderCancel(Protocol::CancelOrderRequest& order) = 0;

        virtual void raiseError(std::string errorMessage) const;

        bool isLoggedIn() const;
        void login();
        void logout();

       private:
        void asyncRead();
        void onRead(error_code error, std::size_t bytes_transferred);

        void asyncWrite();
        void onWrite(error_code error, std::size_t bytes_transferred);

        std::optional<tcp::socket> mSocket;
        io::streambuf mStreamBuf;
        std::queue<SmartBuffer> mOutgoing;

        message_handler mOnMessage;
        error_handler mOnError;

        Protocol::LoginResponse mLoginResponse;

        std::unique_ptr<IMessageParser> mParser;

        ParticipantFSM mFSM;
    };
} // namespace Sim::Net
