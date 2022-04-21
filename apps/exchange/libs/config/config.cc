#include "config.h"

namespace Sim::Config
{
    ExchangeConfig::ExchangeConfig(uint32_t port, std::vector<Instrument> instruments, std::string dbString)
        : mPort(port), mInstruments(instruments), mDbString(dbString)
    {}

    const std::vector<Instrument>& ExchangeConfig::getInstruments() const { return mInstruments; }

    uint32_t ExchangeConfig::getPort() const { return mPort; }

    const std::string& ExchangeConfig::getDbString() const { return mDbString; }

} // namespace Sim::Config
