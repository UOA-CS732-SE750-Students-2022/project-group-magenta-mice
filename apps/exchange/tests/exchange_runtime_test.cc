#include "test_common.h"

#include <net/exchange_runtime.h>

namespace Sim::Testing
{
    class ExchangeRuntimeTestFixture : public Test
    {
       protected:
        ExchangeRuntimeTestFixture() : mExchangeRuntime{ mConfig, mDb, mExchange } {}

        MockConfig mConfig;
        MockConnection mDb;
        MockExchange mExchange;

        Net::ExchangeRuntime mExchangeRuntime;
    };

    TEST_F(ExchangeRuntimeTestFixture, AddInstrumentAddsToExchange)
    {
        auto instrument = Instrument{ .mName = "AAPL", .mPositionLimit = 100, .mTickSizeCents = 100, .mId = "abc-123" };

        EXPECT_CALL(mExchange, addInstrument(instrument));

        mExchangeRuntime.addInstrument(instrument);
    }

    TEST_F(ExchangeRuntimeTestFixture, GetExchangeReturnsExchange)
    {
        EXPECT_EQ(&mExchangeRuntime.getExchange(), &mExchange);
    }

    TEST_F(ExchangeRuntimeTestFixture, TestDiagnoseAppliesToAll)
    {
        EXPECT_CALL(mExchange, applyToAllParticipants(_));
        mExchangeRuntime.diagnose();
    }

    TEST_F(ExchangeRuntimeTestFixture, TestSendPriceFeedSendsToAll)
    {
        EXPECT_CALL(mExchange, getFeed());
        mExchangeRuntime.sendPriceFeed();
    }

    TEST_F(ExchangeRuntimeTestFixture, IncorrectKeyReturnsEmptyOptional)
    {
        EXPECT_CALL(mConfig, getExchangeId()).WillOnce(ReturnRef("xyz-987"));
        EXPECT_CALL(mDb, checkKey(_, _)).WillOnce(Return(std::nullopt));

        auto result = mExchangeRuntime.checkKey("abc-123");
        EXPECT_FALSE(result.has_value());
    }

    TEST_F(ExchangeRuntimeTestFixture, TestCorrectKeyReturnsUserId)
    {
        EXPECT_CALL(mConfig, getExchangeId()).WillOnce(ReturnRef("xyz-987"));
        EXPECT_CALL(mDb, checkKey(_, _)).WillOnce(Return("some-user-id"));

        auto result = mExchangeRuntime.checkKey("abc-123");
        EXPECT_STREQ(result.value().c_str(), "some-user-id");
    }
} // namespace Sim::Testing
