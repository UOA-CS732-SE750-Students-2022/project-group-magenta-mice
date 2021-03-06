#include "config.h"

namespace Sim::Config
{
    ExchangeConfig::ExchangeConfig(
        uint32_t port,
        std::vector<Instrument> instruments,
        std::string dbString,
        std::string exchangeId,
        std::string marketMakerKey)
        : mPort{ port },
          mInstruments{ instruments },
          mDbString{ dbString },
          mExchangeId{ exchangeId },
          mMarketMakerKey{ marketMakerKey }
    {}

    const std::vector<Instrument>& ExchangeConfig::getInstruments() const { return mInstruments; }

    uint32_t ExchangeConfig::getPort() const { return mPort; }

    const std::string& ExchangeConfig::getDbString() const { return mDbString; }

    const std::string& ExchangeConfig::getExchangeId() const { return mExchangeId; }

    const std::string& ExchangeConfig::getMarketMakerKey() const { return mMarketMakerKey; }

} // namespace Sim::Config
