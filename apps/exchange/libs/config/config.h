#pragma once

#include <common/types.h>
#include <string>
#include <vector>

#include <stdint.h>

namespace Sim::Config
{
    struct IConfig
    {
        virtual ~IConfig() = default;

        virtual uint32_t getPort() const = 0;
        virtual const std::vector<Instrument>& getInstruments() const = 0;
        virtual const std::string& getDbString() const = 0;
        virtual const std::string& getExchangeId() const = 0;
    };

    class ExchangeConfig : public IConfig
    {
       public:
        ExchangeConfig(
            uint32_t port,
            std::vector<Instrument> instruments,
            std::string dbString,
            std::string exchangeId);
        virtual ~ExchangeConfig() override = default;

        uint32_t getPort() const override;
        const std::vector<Instrument>& getInstruments() const override;
        const std::string& getDbString() const override;
        const std::string& getExchangeId() const override;

       private:
        uint32_t mPort;
        std::vector<Instrument> mInstruments;
        std::string mDbString;
        std::string mExchangeId;
    };
} // namespace Sim::Config
