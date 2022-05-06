#include "test_common.h"

#include <tuple>

namespace Sim::Testing
{
    class IntegrationTestFixture : public Test
    {
       protected:
        IntegrationTestFixture()
            : mExchange(std::make_unique<ParticipantManager>(), std::make_unique<OrderbookManager>()),
              mDatabase(std::make_unique<MockConnection>()),
              mConfig(std::make_unique<MockConfig>())
        {
            mExchange.addInstrument(Instrument{
                .mName = "AAPL",
                .mPositionLimit = 100,
                .mTickSizeCents = 1,
            });

            mParticipant1 = std::make_shared<NiceMock<MockParticipant>>(
                std::make_unique<OrderFactory>(), std::nullopt, Protocol::LoginResponse(), *mDatabase, *mConfig);
            mExchange.addParticipant(mParticipant1);

            mParticipant2 = std::make_shared<NiceMock<MockParticipant>>(
                std::make_unique<OrderFactory>(), std::nullopt, Protocol::LoginResponse(), *mDatabase, *mConfig);
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

        std::pair<Protocol::InsertOrderRequest, Protocol::CancelOrderRequest> makeOrderWithCancel(
            uint32_t client,
            RequestWrapper requestOptions)
        {
            Protocol::InsertOrderRequest insertRequest = makeOrder(client, requestOptions);
            Protocol::CancelOrderRequest cancelRequest;
            cancelRequest.set_clientid(insertRequest.clientid());

            return std::make_pair(insertRequest, cancelRequest);
        }

        Exchange mExchange;
        std::unique_ptr<Db::IConnection> mDatabase;
        std::unique_ptr<MockConfig> mConfig;

        std::unordered_map<uint32_t, uint32_t> mParticipantOrders;

        std::shared_ptr<NiceMock<MockParticipant>> mParticipant1;
        std::shared_ptr<NiceMock<MockParticipant>> mParticipant2;
    }; // namespace Sim::Testing

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

    TEST_F(IntegrationTestFixture, TestOrderFlowWithCancels)
    {
        auto [ask1, cancelAsk1] = makeOrderWithCancel(
            0,
            {
                .mInstrumentId = 0,
                .mLifespan = Protocol::InsertOrderRequest::GFD,
                .mSide = Protocol::InsertOrderRequest::SELL,
                .mPrice = 100,
                .mVolume = 5,

            });

        auto bid1 = makeOrder(
            1,
            {
                .mInstrumentId = 0,
                .mLifespan = Protocol::InsertOrderRequest::FAK,
                .mSide = Protocol::InsertOrderRequest::BUY,
                .mPrice = 100,
                .mVolume = 3,

            });

        mParticipant1->requestOrderInsert(ask1);
        ASSERT_EQ(mExchange.getOrderbook(0).getTopAsk()->get()->mVolume, 5);

        mParticipant2->requestOrderInsert(bid1);
        ASSERT_EQ(mExchange.getOrderbook(0).getTopAsk()->get()->mVolume, 2);

        mParticipant1->requestOrderCancel(cancelAsk1);
        ASSERT_EQ(mExchange.getOrderbook(0).getNumSellOrders(), 0);
    }

    TEST_F(IntegrationTestFixture, TestInvalidCancel)
    {
        auto [ask1, cancelAsk1] = makeOrderWithCancel(
            0,
            {
                .mInstrumentId = 0,
                .mLifespan = Protocol::InsertOrderRequest::GFD,
                .mSide = Protocol::InsertOrderRequest::SELL,
                .mPrice = 100,
                .mVolume = 5,

            });

        // invalid cancel order here
        cancelAsk1.set_clientid(1);

        mParticipant1->requestOrderInsert(ask1);
        ASSERT_EQ(mExchange.getOrderbook(0).getTopAsk()->get()->mVolume, 5);

        mParticipant1->requestOrderCancel(cancelAsk1);
        ASSERT_EQ(mExchange.getOrderbook(0).getNumSellOrders(), 1);
    }

    TEST_F(IntegrationTestFixture, TestCancelWithoutOrder)
    {
        auto [ask1, cancelAsk1] = makeOrderWithCancel(
            0,
            {
                .mInstrumentId = 0,
                .mLifespan = Protocol::InsertOrderRequest::GFD,
                .mSide = Protocol::InsertOrderRequest::SELL,
                .mPrice = 100,
                .mVolume = 5,

            });

        mParticipant1->requestOrderCancel(cancelAsk1);
        ASSERT_EQ(mExchange.getOrderbook(0).getNumSellOrders(), 0);
    }
} // namespace Sim::Testing
