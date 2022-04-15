#include "test_common.h"

#include <common/types.h>
#include <config/config_reader.h>
#include <string>

namespace Sim::Testing
{
    class ConfigReaderTestFixture : public Test
    {
       protected:
        ConfigReaderTestFixture() : mFileReader(MockFileStringReader()), mConfigReader(mFileReader) {}

        MockFileStringReader mFileReader;
        Config::ConfigReader mConfigReader;
    };

    TEST_F(ConfigReaderTestFixture, TestJsonIsReadCorrectly)
    {
        const std::string json = R"(
        {
            "port": 1234,
            "instruments": [
                {
                    "name": "AAPL",
                    "positionLimit": 10,
                    "tickSize": 5
                },
                {
                    "name": "AMZN",
                    "positionLimit": 5,
                    "tickSize": 10
                }
            ]
        }
        )";

        EXPECT_CALL(mFileReader, getContents(_)).WillOnce(Return(json));

        const char* relativeConfigFilePath = "config.json";
        const Config::ExchangeConfig config = mConfigReader.read(relativeConfigFilePath);

        EXPECT_EQ(1234, config.getPort());
        EXPECT_THAT(
            config.getInstruments(),
            testing::ElementsAre(
                Instrument{ .mName = "AAPL", .mPositionLimit = 10, .mTickSizeCents = 5 },
                Instrument{ .mName = "AMZN", .mPositionLimit = 5, .mTickSizeCents = 10 }));
    }
} // namespace Sim::Testing
