#pragma once

#include "message_parsing.h"

#include <boost/asio.hpp>
#include <functional>
#include <optional>
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
    using error_handler = std::function<void()>;

    struct Header
    {
        int32_t mMessageType;
        int32_t mMessageSize;
    };

    using SmartBuffer = std::unique_ptr<io::mutable_buffer, std::function<void(io::mutable_buffer*)>>;

    class ParticipantSession : public std::enable_shared_from_this<ParticipantSession>
    {
       public:
        ParticipantSession(std::optional<tcp::socket>&& socket);

        void start(message_handler&& on_message, error_handler&& on_error);
        void sendMessage(int messageType, std::string const& message);

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
    };
} // namespace Sim::Net
