#include "test_common.h"

namespace Sim::Testing
{
    class IntegrationTestFixture : public Test
    {
       protected:
        IntegrationTestFixture()
            : mExchange(std::make_unique<ParticipantManager>(), std::make_unique<OrderbookManager>())
        {
            mExchange.addInstrument(Instrument{
                .mName = "AAPL",
                .mPositionLimit = 100,
                .mTickSizeCents = 1,
            });

            mParticipant1 = std::make_shared<Participant>(std::make_unique<OrderFactory>());
            mExchange.addParticipant(mParticipant1);

            mParticipant2 = std::make_shared<Participant>(std::make_unique<OrderFactory>());
            mExchange.addParticipant(mParticipant2);
        }

        struct RequestWrapper
        {
            uint32_t mInstrumentId;
            Protocol::InsertOrderRequest_Lifespan mLifespan;
            Protocol::InsertOrderRequest_Side mSide;
            uint32_t mPrice;
            uint32_t mVolume;
        };

        Protocol::InsertOrderRequest makeOrder(uint32_t client, RequestWrapper requestOptions)
        {
            Protocol::InsertOrderRequest request;

            request.set_clientid(mParticipantOrders[client]++);
            request.set_instrumentid(requestOptions.mInstrumentId);
            request.set_lifespan(requestOptions.mLifespan);
            request.set_side(requestOptions.mSide);
            request.set_price(requestOptions.mPrice);
            request.set_volume(requestOptions.mVolume);

            return request;
        }

        Exchange mExchange;

        std::unordered_map<uint32_t, uint32_t> mParticipantOrders;

        std::shared_ptr<Participant> mParticipant1;
        std::shared_ptr<Participant> mParticipant2;
    };

    TEST_F(IntegrationTestFixture, TestOrderFlow)
    {
        auto askRequest = makeOrder(
            0,
            {
                .mInstrumentId = 0,
                .mLifespan = Protocol::InsertOrderRequest::GFD,
                .mSide = Protocol::InsertOrderRequest::SELL,
                .mPrice = 100,
                .mVolume = 5,

            });

        auto askRequest2 = makeOrder(
            0,
            {
                .mInstrumentId = 0,
                .mLifespan = Protocol::InsertOrderRequest::GFD,
                .mSide = Protocol::InsertOrderRequest::SELL,
                .mPrice = 99,
                .mVolume = 8,

            });

        auto bidRequest1 = makeOrder(
            1,
            {
                .mInstrumentId = 0,
                .mLifespan = Protocol::InsertOrderRequest::GFD,
                .mSide = Protocol::InsertOrderRequest::BUY,
                .mPrice = 100,
                .mVolume = 13,
            });

        mParticipant1->requestOrderInsert(askRequest);
        ASSERT_EQ(mExchange.getOrderbook(0).getNumBuyOrders(), 0);
        ASSERT_EQ(mExchange.getOrderbook(0).getNumSellOrders(), 1);

        mParticipant1->requestOrderInsert(askRequest2);
        ASSERT_EQ(mExchange.getOrderbook(0).getNumBuyOrders(), 0);
        ASSERT_EQ(mExchange.getOrderbook(0).getNumSellOrders(), 2);

        mParticipant2->requestOrderInsert(bidRequest1);
        ASSERT_EQ(mExchange.getOrderbook(0).getNumBuyOrders(), 0);
        ASSERT_EQ(mExchange.getOrderbook(0).getNumSellOrders(), 0);

        EXPECT_EQ(mParticipant1->getCash(), 100 * 5 + 99 * 8);
        EXPECT_EQ(mParticipant1->getPosition(0), -13);

        EXPECT_EQ(mParticipant2->getCash(), -1 * (100 * 5 + 99 * 8));
        EXPECT_EQ(mParticipant2->getPosition(0), 13);
    }
} // namespace Sim::Testing
