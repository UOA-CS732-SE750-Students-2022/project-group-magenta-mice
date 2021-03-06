#include "test_common.h"

namespace Sim::Testing
{
    class OrderbookTestFixture : public Test
    {
       protected:
        OrderbookTestFixture() {}

        Orderbook mOrderbook;
    };

    TEST_F(OrderbookTestFixture, TestGfdBidIsAdded)
    {
        auto order = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BUY, 100, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(order)));
        ASSERT_EQ(mOrderbook.getNumBuyOrders(), 1);
        ASSERT_EQ(mOrderbook.getNumSellOrders(), 0);
    }

    TEST_F(OrderbookTestFixture, TestGfdAskIsAdded)
    {
        auto order = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::SELL, 100, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(order)));
        ASSERT_EQ(mOrderbook.getNumBuyOrders(), 0);
        ASSERT_EQ(mOrderbook.getNumSellOrders(), 1);
    }

    TEST_F(OrderbookTestFixture, TestFakBidIsNotAdded)
    {
        auto order = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::BUY, 100, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(order)));
        ASSERT_EQ(mOrderbook.getNumBuyOrders(), 0);
        ASSERT_EQ(mOrderbook.getNumSellOrders(), 0);
    }

    TEST_F(OrderbookTestFixture, TestFakAskIsNotAdded)
    {
        auto order = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::SELL, 100, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(order)));
        ASSERT_EQ(mOrderbook.getNumBuyOrders(), 0);
        ASSERT_EQ(mOrderbook.getNumSellOrders(), 0);
    }

    TEST_F(OrderbookTestFixture, TestExistingSellSideGfdIsTradedWith)
    {
        auto order = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::SELL, 99, 5);

        auto order1 = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::BUY, 100, 2);
        auto order1Ptr = order1.get();

        auto order2 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BUY, 100, 2);
        auto order2Ptr = order2.get();

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(order)));
        ASSERT_EQ(5, mOrderbook.getTopAsk()->get()->mVolume);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(order1)));
        ASSERT_EQ(3, mOrderbook.getTopAsk()->get()->mVolume);
        ASSERT_EQ(0, order1Ptr->mVolume);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(order2)));
        ASSERT_EQ(1, mOrderbook.getTopAsk()->get()->mVolume);
        ASSERT_EQ(0, order2Ptr->mVolume);
    }

    TEST_F(OrderbookTestFixture, TestExistingBuySideGfdIsTradedWith)
    {
        auto order = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BUY, 100, 5);

        auto order1 = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::SELL, 99, 2);
        auto order2 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::SELL, 99, 2);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(order)));
        ASSERT_EQ(5, mOrderbook.getTopBid()->get()->mVolume);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(order1)));
        ASSERT_EQ(3, mOrderbook.getTopBid()->get()->mVolume);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(order2)));
        ASSERT_EQ(1, mOrderbook.getTopBid()->get()->mVolume);
    }

    TEST_F(OrderbookTestFixture, TestGFDInsertionAlertIsRun)
    {
        auto buyOrder = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BUY, 99, 5);
        auto sellOrder = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::SELL, 101, 5);

        bool buyInsertionAlertCalled = false;
        bool sellInsertionAlertCalled = false;

        buyOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&buyInsertionAlertCalled](const Order& order, uint32_t remainingVolume) {
                    ASSERT_EQ(order.mClientId, 1);
                    ASSERT_EQ(remainingVolume, 5);
                    buyInsertionAlertCalled = true;
                },
        };

        sellOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&sellInsertionAlertCalled](const Order& order, uint32_t remainingVolume) {
                    ASSERT_EQ(order.mClientId, 1);
                    ASSERT_EQ(remainingVolume, 5);
                    sellInsertionAlertCalled = true;
                },
        };

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(buyOrder)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(sellOrder)));

        ASSERT_TRUE(buyInsertionAlertCalled);
        ASSERT_TRUE(sellInsertionAlertCalled);
    }

    TEST_F(OrderbookTestFixture, TestFAKInsertionAlertIsRun)
    {
        auto buyOrder = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::BUY, 99, 5);
        auto sellOrder = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::SELL, 101, 5);

        bool buyInsertionAlertCalled = false;
        bool sellInsertionAlertCalled = false;

        buyOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&buyInsertionAlertCalled](const Order& order, uint32_t remainingVolume) {
                    ASSERT_EQ(order.mClientId, 1);
                    ASSERT_EQ(remainingVolume, 0);
                    buyInsertionAlertCalled = true;
                },
        };

        sellOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&sellInsertionAlertCalled](const Order& order, uint32_t remainingVolume) {
                    ASSERT_EQ(order.mClientId, 1);
                    ASSERT_EQ(remainingVolume, 0);
                    sellInsertionAlertCalled = true;
                },
        };

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(buyOrder)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(sellOrder)));

        ASSERT_TRUE(buyInsertionAlertCalled);
        ASSERT_TRUE(sellInsertionAlertCalled);
    }

    TEST_F(OrderbookTestFixture, TestBuyGFDOrderLifecycle)
    {
        auto buyOrder = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BUY, 100, 5);
        auto buyOrderPtr = buyOrder.get();

        auto sellOrder1 = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::SELL, 97, 3);
        auto sellOrder2 = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::SELL, 95, 3);

        auto buyListenerResults = std::vector<std::pair<uint32_t, uint32_t>>{};
        auto fillListenerResults = std::vector<std::tuple<uint32_t, uint32_t, uint32_t>>{};

        buyOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&buyListenerResults](const Order& order, uint32_t remainingVolume) {
                    buyListenerResults.emplace_back(std::make_pair(order.mClientId, remainingVolume));
                },
            .onFill =
                [&fillListenerResults](const Order& order, uint32_t volumeFilled, uint32_t price) {
                    fillListenerResults.emplace_back(std::make_tuple(order.mClientId, volumeFilled, price));
                },
        };

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(buyOrder)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(sellOrder1)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(sellOrder2)));

        ASSERT_EQ(0, buyOrderPtr->mVolume);

        ASSERT_THAT(
            buyListenerResults, testing::ElementsAre(std::make_pair(1, 5), std::make_pair(1, 2), std::make_pair(1, 0)));

        ASSERT_THAT(fillListenerResults, testing::ElementsAre(std::make_tuple(1, 3, 97), std::make_tuple(1, 2, 95)));
    }

    TEST_F(OrderbookTestFixture, TestAskGFDOrderLifecycle)
    {
        auto askOrder = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::ASK, 90, 5);
        auto askOrderPtr = askOrder.get();

        auto bidOrder1 = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::BID, 97, 4);
        auto bidOrder2 = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::BID, 95, 2);

        auto buyListenerResults = std::vector<std::pair<uint32_t, uint32_t>>{};
        auto fillListenerResults = std::vector<std::tuple<uint32_t, uint32_t, uint32_t>>{};

        askOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&buyListenerResults](const Order& order, uint32_t remainingVolume) {
                    buyListenerResults.emplace_back(std::make_pair(order.mClientId, remainingVolume));
                },
            .onFill =
                [&fillListenerResults](const Order& order, uint32_t volumeFilled, uint32_t price) {
                    fillListenerResults.emplace_back(std::make_tuple(order.mClientId, volumeFilled, price));
                },
        };

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder1)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder2)));

        ASSERT_EQ(0, askOrderPtr->mVolume);

        ASSERT_THAT(
            buyListenerResults, testing::ElementsAre(std::make_pair(1, 5), std::make_pair(1, 1), std::make_pair(1, 0)));

        ASSERT_THAT(fillListenerResults, testing::ElementsAre(std::make_tuple(1, 4, 90), std::make_tuple(1, 1, 90)));
    }

    TEST_F(OrderbookTestFixture, TestEarlierAskOrdersHaveQueuePriority)
    {
        auto askOrder1 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::ASK, 90, 5);
        auto askOrder1Ptr = askOrder1.get();

        auto askOrder2 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::ASK, 90, 5);
        auto askOrder2Ptr = askOrder2.get();

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder1)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder2)));

        ASSERT_EQ(askOrder1Ptr->mVolume, 5);
        ASSERT_EQ(askOrder2Ptr->mVolume, 5);

        auto bidOrder1 = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::BID, 97, 3);
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder1)));

        ASSERT_EQ(askOrder1Ptr->mVolume, 2);
        ASSERT_EQ(askOrder2Ptr->mVolume, 5);

        auto bidOrder2 = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::BID, 97, 3);
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder2)));

        ASSERT_EQ(askOrder1Ptr->mVolume, 0);
        ASSERT_EQ(askOrder2Ptr->mVolume, 4);
    }

    TEST_F(OrderbookTestFixture, TestEarlierBidOrdersHaveQueuePriority)
    {
        auto bidOrder1 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BID, 90, 5);
        auto bidOrder1Ptr = bidOrder1.get();

        auto bidOrder2 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BID, 90, 5);
        auto bidOrder2Ptr = bidOrder2.get();

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder1)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder2)));

        ASSERT_EQ(bidOrder1Ptr->mVolume, 5);
        ASSERT_EQ(bidOrder2Ptr->mVolume, 5);

        auto askOrder1 = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::ASK, 90, 3);
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder1)));

        ASSERT_EQ(bidOrder1Ptr->mVolume, 2);
        ASSERT_EQ(bidOrder2Ptr->mVolume, 5);

        auto askOrder2 = std::make_unique<Order>(1, 1, Lifespan::FAK, Side::ASK, 90, 3);
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder2)));

        ASSERT_EQ(bidOrder1Ptr->mVolume, 0);
        ASSERT_EQ(bidOrder2Ptr->mVolume, 4);
    }

    TEST_F(OrderbookTestFixture, TestGettingTopBids)
    {
        auto bidOrder1 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BID, 90, 5);
        auto bidOrder2 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BID, 91, 5);
        auto bidOrder3 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BID, 92, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder1)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder2)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder3)));

        auto topBidsGetThree = mOrderbook.getTopBidLevels(3);
        ASSERT_THAT(
            topBidsGetThree, testing::ElementsAre(std::make_pair(92, 5), std::make_pair(91, 5), std::make_pair(90, 5)));

        auto topBidsGetTwo = mOrderbook.getTopBidLevels(2);
        ASSERT_THAT(topBidsGetTwo, testing::ElementsAre(std::make_pair(92, 5), std::make_pair(91, 5)));

        auto topBidsGetFour = mOrderbook.getTopBidLevels(4);
        ASSERT_THAT(
            topBidsGetFour, testing::ElementsAre(std::make_pair(92, 5), std::make_pair(91, 5), std::make_pair(90, 5)));
    }

    TEST_F(OrderbookTestFixture, TestGettingTopBidsCombinesOrdersOnSameLevel)
    {
        auto bidOrder1 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BID, 90, 5);
        auto bidOrder2 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BID, 91, 5);
        auto bidOrder3 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BID, 92, 5);
        auto bidOrder4 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::BID, 92, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder1)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder2)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder3)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(bidOrder4)));

        auto topBidsGetThree = mOrderbook.getTopBidLevels(3);
        ASSERT_THAT(
            topBidsGetThree,
            testing::ElementsAre(std::make_pair(92, 10), std::make_pair(91, 5), std::make_pair(90, 5)));

        auto topBidsGetTwo = mOrderbook.getTopBidLevels(2);
        ASSERT_THAT(topBidsGetTwo, testing::ElementsAre(std::make_pair(92, 10), std::make_pair(91, 5)));

        auto topBidsGetFour = mOrderbook.getTopBidLevels(4);
        ASSERT_THAT(
            topBidsGetFour, testing::ElementsAre(std::make_pair(92, 10), std::make_pair(91, 5), std::make_pair(90, 5)));
    }

    TEST_F(OrderbookTestFixture, TestGettingTopAsks)
    {
        auto askOrder1 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::ASK, 90, 5);
        auto askOrder2 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::ASK, 91, 5);
        auto askOrder3 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::ASK, 92, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder1)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder2)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder3)));

        auto topAsksGetThree = mOrderbook.getTopAskLevels(3);
        ASSERT_THAT(
            topAsksGetThree, testing::ElementsAre(std::make_pair(90, 5), std::make_pair(91, 5), std::make_pair(92, 5)));

        auto topAsksGetTwo = mOrderbook.getTopAskLevels(2);
        ASSERT_THAT(topAsksGetTwo, testing::ElementsAre(std::make_pair(90, 5), std::make_pair(91, 5)));

        auto topAsksGetFour = mOrderbook.getTopAskLevels(4);
        ASSERT_THAT(
            topAsksGetFour, testing::ElementsAre(std::make_pair(90, 5), std::make_pair(91, 5), std::make_pair(92, 5)));
    }

    TEST_F(OrderbookTestFixture, TestGettingTopAsksCombinesOrdersOnSameLevel)
    {
        auto askOrder1 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::ASK, 90, 5);
        auto askOrder2 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::ASK, 91, 5);
        auto askOrder3 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::ASK, 92, 5);
        auto askOrder4 = std::make_unique<Order>(1, 1, Lifespan::GFD, Side::ASK, 92, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder1)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder2)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder3)));
        ASSERT_TRUE(mOrderbook.insertOrder(std::move(askOrder4)));

        auto topAsksGetThree = mOrderbook.getTopAskLevels(3);
        ASSERT_THAT(
            topAsksGetThree,
            testing::ElementsAre(std::make_pair(90, 5), std::make_pair(91, 5), std::make_pair(92, 10)));

        auto topAsksGetFour = mOrderbook.getTopAskLevels(4);
        ASSERT_THAT(
            topAsksGetFour, testing::ElementsAre(std::make_pair(90, 5), std::make_pair(91, 5), std::make_pair(92, 10)));
    }

} // namespace Sim::Testing
