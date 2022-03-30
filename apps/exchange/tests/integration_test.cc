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

        Exchange mExchange;

        std::shared_ptr<Participant> mParticipant1;
        std::shared_ptr<Participant> mParticipant2;
    };

    TEST_F(IntegrationTestFixture, TestOrderFlow)
    {
        Protocol::InsertOrderRequest askRequest;
        askRequest.set_clientid(0);
        askRequest.set_instrumentid(0);
        askRequest.set_lifespan(Protocol::InsertOrderRequest::GFD);
        askRequest.set_side(Protocol::InsertOrderRequest::SELL);
        askRequest.set_price(100);
        askRequest.set_volume(5);

        Protocol::InsertOrderRequest askRequest2;
        askRequest2.set_clientid(1);
        askRequest2.set_instrumentid(0);
        askRequest2.set_lifespan(Protocol::InsertOrderRequest::GFD);
        askRequest2.set_side(Protocol::InsertOrderRequest::SELL);
        askRequest2.set_price(99);
        askRequest2.set_volume(8);

        Protocol::InsertOrderRequest bidRequest1;
        bidRequest1.set_clientid(0);
        bidRequest1.set_instrumentid(0);
        bidRequest1.set_lifespan(Protocol::InsertOrderRequest::GFD);
        bidRequest1.set_side(Protocol::InsertOrderRequest::BUY);
        bidRequest1.set_price(100);
        bidRequest1.set_volume(13);

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