#pragma once

#include <common/types.h>
#include <vector>

#include <stdint.h>

namespace Sim::Config
{
    struct IConfig
    {
        virtual ~IConfig() = default;

        virtual uint32_t getPort() const = 0;
        virtual const std::vector<Instrument>& getInstruments() const = 0;
    };

    class Config : IConfig
    {
       public:
        Config(uint32_t port, std::vector<Instrument> instruments);
        ~Config() override = default;

        uint32_t getPort() const override;
        const std::vector<Instrument>& getInstruments() const override;

       private:
        uint32_t mPort;
        std::vector<Instrument> mInstruments;
    };
} // namespace Sim::Config
