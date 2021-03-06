#include <boost/asio.hpp>
#include <common/timer.h>
#include <config/config_reader.h>
#include <db/connection.h>
#include <engine/orderbook_manager.h>
#include <engine/participant_manager.h>
#include <iostream>
#include <net/exchange_runtime.h>
#include <pqxx/pqxx>
#include <wss/server_ws.hpp>

int main(int argc, char* argv[])
{
    namespace io = boost::asio;

    auto ioContext = std::make_shared<io::io_context>();

    Sim::Common::FileStringReader fileReader;
    Sim::Config::ConfigReader reader(fileReader);

    if (!reader.validate(argc, argv))
    {
        return 1;
    }

    auto config = reader.read(argv[1]);

    auto& instruments = config.getInstruments();
    auto& dbString = config.getDbString();

    Sim::Db::Connection dbService{ dbString };
    Sim::Exchange exchange{ std::make_unique<Sim::ParticipantManager>(), std::make_unique<Sim::OrderbookManager>() };

    Sim::Net::ExchangeRuntime exchangeRuntime{ config, dbService, exchange };

    Sim::Common::Timer timer(*ioContext, boost::posix_time::millisec(250));
    timer.start([&]() {
        // exchangeRuntime.diagnose();
        exchangeRuntime.sendPriceFeed();
        // exchangeRuntime.getExchange().printBooks();
    });

    for (const auto& instrument : instruments)
    {
        exchangeRuntime.addInstrument(instrument);
    }

    exchangeRuntime.startServer(ioContext);

    return 0;
}
