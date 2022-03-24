#include "test_common.h"

#include <memory>

namespace Sim::Testing {

class MockOrderbookManager : public OrderbookManager {
   public:
    MOCK_METHOD(void, addInstrument, (Instrument instrument), (override));
    MOCK_METHOD(size_t, size, (), (const override));
    MOCK_METHOD(void, printBooks, (), (const override));
};

class ExchangeTestFixture : public Test {
   protected:
    ExchangeTestFixture()
    {
        mParticipantManager = std::make_unique<ParticipantManager>();
        mOrderbookManager = std::make_unique<MockOrderbookManager>();
    }

    void hydrateExchange()
    {
        mExchange = std::make_unique<Exchange>(
            std::move(mParticipantManager), std::move(mOrderbookManager));
    }

    std::unique_ptr<ParticipantManager> mParticipantManager;
    std::unique_ptr<MockOrderbookManager> mOrderbookManager;

    std::unique_ptr<Exchange> mExchange;
};

TEST_F(ExchangeTestFixture, TestAddInstrument)
{
    Instrument instrument;
    instrument.mName = "AAPL";
    instrument.mPositionLimit = 100;
    instrument.mTickSizeCents = 1;

    EXPECT_CALL(*mOrderbookManager, addInstrument(_)).Times(1);

    hydrateExchange();

    mExchange->addInstrument(instrument);
}

} // namespace Sim::Testing
