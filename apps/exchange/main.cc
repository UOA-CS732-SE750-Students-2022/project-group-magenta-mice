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
        ExchangeServer(io::io_context& io_context, std::uint16_t port)
            : mExchange(std::make_unique<ParticipantManager>(), std::make_unique<OrderbookManager>()),
              mIoContext(io_context),
              mAcceptor(io_context, tcp::endpoint(tcp::v4(), port))
        {}

        void acceptSocket()
        {
            mSocket.emplace(mIoContext);

            mAcceptor.async_accept(*mSocket, [&](error_code error) {
                auto client = std::make_shared<Participant>(std::make_unique<OrderFactory>(), std::move(*mSocket));

                mExchange.addParticipant(client);

                client->start(
                    [this](int32_t messageType, std::string const& message) {
                        // on_message(messageType, message);
                        (void)this;
                    },
                    [this, weak = std::weak_ptr(client)]() {
                        (void)this;
                        // on_error();
                        // remove participant from exchange
                    });

                acceptSocket();
            });
        }

        void messageAll(int32_t messageType, std::string const& message)
        {
            mExchange.applyToAllParticipants(
                [&messageType, &message](Participant& participant) { participant.sendMessage(messageType, message); });
        }

        const Exchange& getExchange() const { return mExchange; }

        void addInstrument(Instrument instrument) { mExchange.addInstrument(instrument); }

       private:
        Exchange mExchange;

        io::io_context& mIoContext;
        tcp::acceptor mAcceptor;
        std::optional<tcp::socket> mSocket;
    };
} // namespace Sim::Net

int main()
{
    io::io_context ioContext;
    auto port = 15001;
    Sim::Net::ExchangeServer server(ioContext, port);

    server.addInstrument(Sim::Instrument{ .mName = "AAPL", .mPositionLimit = 100, .mTickSizeCents = 1 });

    std::cout << "Server started on localhost:" << port << "!" << std::endl;

    Sim::Common::Timer timer(ioContext, boost::posix_time::millisec(2000));
    timer.start([&]() { server.getExchange().printBooks(); });

    server.acceptSocket();
    ioContext.run();

    return 0;
}
