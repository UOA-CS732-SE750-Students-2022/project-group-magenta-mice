#include <boost/asio.hpp>
#include <common/timer.h>
#include <config/config_reader.h>
#include <db/connection.h>
#include <iostream>
#include <net/exchange_server.h>
#include <pqxx/pqxx>

int main(int argc, char* argv[])
{
    Sim::Common::FileStringReader fileReader;
    Sim::Config::ConfigReader reader(fileReader);

    if (!reader.validate(argc, argv))
    {
        return 1;
    }

    auto config = reader.read(argv[1]);
    auto port = config.getPort();
    auto& instruments = config.getInstruments();
    auto& dbString = config.getDbString();
    auto& exchangeId = config.getExchangeId();

    Sim::Db::Connection dbService{ dbString };

    auto result = dbService.exec([](pqxx::work& W) {
        return W.exec_params("SELECT * FROM public.\"User\" WHERE id=$1", "u5aJQIpSWWRsLktczu0XVWMjWZH3");
    });

    for (const auto& r : result)
    {
        std::cout << r[1].as<std::string>() << '\n';
    }

    io::io_context ioContext;
    Sim::Net::ExchangeServer server(ioContext, port, exchangeId, dbService);

    for (const auto& instrument : instruments)
    {
        server.addInstrument(instrument);
    }

    std::cout << "Server started on localhost:" << port << "!" << std::endl;

    Sim::Common::Timer timer(ioContext, boost::posix_time::millisec(2000));

    timer.start([&]() {
        server.diagnose();
        server.sendPriceFeed();
        server.getExchange().printBooks();
    });
    // .getExchange().printBooks();

    server.acceptSocket();
    ioContext.run();

    return 0;
}
