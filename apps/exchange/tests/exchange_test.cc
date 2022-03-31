#include "test_common.h"

#include <memory>

namespace Sim::Testing
{
    class MockOrderbookManager : public OrderbookManager
    {
       public:
        MOCK_METHOD(void, addInstrument, (Instrument instrument), (override));
        MOCK_METHOD(size_t, size, (), (const override));
        MOCK_METHOD(void, printBooks, (), (const override));
        MOCK_METHOD(
            (std::vector<std::tuple<uint32_t, const Instrument&>>),
            getInstrumentDefinitions,
            (),
            (const override));
    };

    class ExchangeTestFixture : public Test
    {
       protected:
        ExchangeTestFixture()
        {
            mParticipantManager = std::make_unique<ParticipantManager>();
            mOrderbookManager = std::make_unique<MockOrderbookManager>();
        }

        void hydrateExchange()
        {
            mExchange = std::make_unique<Exchange>(std::move(mParticipantManager), std::move(mOrderbookManager));
        }

        Instrument getExampleInstrument(std::string name, uint32_t limit, uint32_t tick)
        {
            Instrument instrument{
                .mName = name,
                .mPositionLimit = limit,
                .mTickSizeCents = tick,
            };

            return instrument;
        }

        std::unique_ptr<ParticipantManager> mParticipantManager;
        std::unique_ptr<MockOrderbookManager> mOrderbookManager;

        std::unique_ptr<Exchange> mExchange;
    };

    TEST_F(ExchangeTestFixture, TestAddInstrument)
    {
        EXPECT_CALL(*mOrderbookManager, addInstrument(_)).Times(1);

        auto instrument = getExampleInstrument("AAPL", 100, 1);
        hydrateExchange();

        mExchange->addInstrument(instrument);
    }

    TEST_F(ExchangeTestFixture, TestGettingInstrumentDefinitions)
    {
        auto inst1 = getExampleInstrument("AAPL", 100, 1);
        auto inst2 = getExampleInstrument("MSFT", 150, 2);

        auto inst1Tuple = std::make_tuple(1, inst1);
        auto inst2Tuple = std::make_tuple(2, inst2);

        auto instVector = std::vector<std::tuple<uint32_t, const Instrument&>>{ inst1Tuple, inst2Tuple };

        EXPECT_CALL(*mOrderbookManager, getInstrumentDefinitions()).Times(1).WillOnce(Return(instVector));

        hydrateExchange();

        auto protocolInstruments = mExchange->getExchangeInstruments();
        ASSERT_EQ(2, protocolInstruments.instruments_size());

        ASSERT_EQ(1, protocolInstruments.instruments(0).id());
        ASSERT_EQ(2, protocolInstruments.instruments(1).id());

        ASSERT_STREQ("AAPL", protocolInstruments.instruments(0).ticker().c_str());
        ASSERT_STREQ("MSFT", protocolInstruments.instruments(1).ticker().c_str());

        ASSERT_EQ(100, protocolInstruments.instruments(0).positionlimit());
        ASSERT_EQ(150, protocolInstruments.instruments(1).positionlimit());

        ASSERT_EQ(1, protocolInstruments.instruments(0).ticksizeincents());
        ASSERT_EQ(2, protocolInstruments.instruments(1).ticksizeincents());
    }

} // namespace Sim::Testing
