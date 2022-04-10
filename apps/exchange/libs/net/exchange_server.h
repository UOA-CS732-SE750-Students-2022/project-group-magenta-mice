#include <boost/asio.hpp>
#include <common/timer.h>
#include <common/types.h>
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
        ExchangeServer(io::io_context& io_context, std::uint16_t port);

        void acceptSocket();

        void messageAll(int32_t messageType, std::string const& message);

        const Exchange& getExchange() const;

        void addInstrument(Instrument instrument);

       private:
        Exchange mExchange;

        io::io_context& mIoContext;
        tcp::acceptor mAcceptor;
        std::optional<tcp::socket> mSocket;
    };
} // namespace Sim::Net
