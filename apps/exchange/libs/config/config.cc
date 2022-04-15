#include "config.h"

namespace Sim::Config
{
    Config::Config(uint32_t port, std::vector<Instrument> instruments) : mPort(port), mInstruments(instruments) {}

    const std::vector<Instrument>& Config::getInstruments() const { return mInstruments; }

    uint32_t Config::getPort() const { return mPort; }

} // namespace Sim::Config
