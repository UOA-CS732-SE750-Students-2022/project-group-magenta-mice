#include "config.h"

namespace Sim::Config
{
    ExchangeConfig::ExchangeConfig(uint32_t port, std::vector<Instrument> instruments)
        : mPort(port), mInstruments(instruments)
    {}

    const std::vector<Instrument>& ExchangeConfig::getInstruments() const { return mInstruments; }

    uint32_t ExchangeConfig::getPort() const { return mPort; }

} // namespace Sim::Config
