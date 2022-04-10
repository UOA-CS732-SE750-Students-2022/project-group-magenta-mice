#include <boost/asio.hpp>
#include <common/timer.h>
#include <iostream>
#include <net/exchange_server.h>

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
