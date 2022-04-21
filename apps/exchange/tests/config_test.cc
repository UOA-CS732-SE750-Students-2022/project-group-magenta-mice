#include "test_common.h"

#include <common/types.h>
#include <config/config.h>

namespace Sim::Testing
{
    class ConfigTestFixture : public Test
    {
       protected:
        ConfigTestFixture() : mConfig(Config::ExchangeConfig(0, std::vector<Instrument>(), std::string())) {}

        struct ConfigOptions
        {
            uint32_t mPort = 0;
            std::vector<Instrument> mInstruments;
            std::string mDbString;
        };

        void createConfig(ConfigOptions options)
        {
            mConfig = Config::ExchangeConfig(options.mPort, options.mInstruments, options.mDbString);
        }

        Config::ExchangeConfig mConfig;
    };

    TEST_F(ConfigTestFixture, TestPortIsReturnedCorrectly)
    {
        createConfig(ConfigOptions{ .mPort = 1234 });

        EXPECT_EQ(1234, mConfig.getPort());
    }

    TEST_F(ConfigTestFixture, TestInstrumentsAreReturnedCorrectly)
    {
        createConfig(ConfigOptions{
            .mInstruments = { Instrument{ .mName = "AAPL", .mPositionLimit = 10, .mTickSizeCents = 5 },
                              Instrument{ .mName = "AMZN", .mPositionLimit = 5, .mTickSizeCents = 10 } } });
        EXPECT_THAT(
            mConfig.getInstruments(),
            testing::ElementsAre(
                Instrument{ .mName = "AAPL", .mPositionLimit = 10, .mTickSizeCents = 5 },
                Instrument{ .mName = "AMZN", .mPositionLimit = 5, .mTickSizeCents = 10 }));
    }

    TEST_F(ConfigTestFixture, TestDbStringIsReturnedCorrectly)
    {
        createConfig(ConfigOptions{ .mDbString = "my database string" });
        EXPECT_EQ("my database string", mConfig.getDbString());
    }
} // namespace Sim::Testing
