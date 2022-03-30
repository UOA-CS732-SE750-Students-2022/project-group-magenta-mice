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
        auto order = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::BUY, 100, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(order));
        ASSERT_EQ(mOrderbook.getNumBuyOrders(), 1);
        ASSERT_EQ(mOrderbook.getNumSellOrders(), 0);
    }

    TEST_F(OrderbookTestFixture, TestGfdAskIsAdded)
    {
        auto order = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::SELL, 100, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(order));
        ASSERT_EQ(mOrderbook.getNumBuyOrders(), 0);
        ASSERT_EQ(mOrderbook.getNumSellOrders(), 1);
    }

    TEST_F(OrderbookTestFixture, TestFakBidIsNotAdded)
    {
        auto order = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::BUY, 100, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(order));
        ASSERT_EQ(mOrderbook.getNumBuyOrders(), 0);
        ASSERT_EQ(mOrderbook.getNumSellOrders(), 0);
    }

    TEST_F(OrderbookTestFixture, TestFakAskIsNotAdded)
    {
        auto order = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::SELL, 100, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(order));
        ASSERT_EQ(mOrderbook.getNumBuyOrders(), 0);
        ASSERT_EQ(mOrderbook.getNumSellOrders(), 0);
    }

    TEST_F(OrderbookTestFixture, TestExistingSellSideGfdIsTradedWith)
    {
        auto order = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::SELL, 99, 5);

        auto order1 = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::BUY, 100, 2);
        auto order2 = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::BUY, 100, 2);

        ASSERT_TRUE(mOrderbook.insertOrder(order));
        ASSERT_EQ(5, mOrderbook.getTopAsk()->get()->mVolume);

        ASSERT_TRUE(mOrderbook.insertOrder(order1));
        ASSERT_EQ(3, mOrderbook.getTopAsk()->get()->mVolume);
        ASSERT_EQ(0, order1->mVolume);

        ASSERT_TRUE(mOrderbook.insertOrder(order2));
        ASSERT_EQ(1, mOrderbook.getTopAsk()->get()->mVolume);
        ASSERT_EQ(0, order2->mVolume);
    }

    TEST_F(OrderbookTestFixture, TestExistingBuySideGfdIsTradedWith)
    {
        auto order = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::BUY, 100, 5);

        auto order1 = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::SELL, 99, 2);
        auto order2 = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::SELL, 99, 2);

        ASSERT_TRUE(mOrderbook.insertOrder(order));
        ASSERT_EQ(5, mOrderbook.getTopBid()->get()->mVolume);

        ASSERT_TRUE(mOrderbook.insertOrder(order1));
        ASSERT_EQ(3, mOrderbook.getTopBid()->get()->mVolume);

        ASSERT_TRUE(mOrderbook.insertOrder(order2));
        ASSERT_EQ(1, mOrderbook.getTopBid()->get()->mVolume);
    }

    TEST_F(OrderbookTestFixture, TestGFDInsertionAlertIsRun)
    {
        auto buyOrder = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::BUY, 99, 5);
        auto sellOrder = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::SELL, 101, 5);

        bool buyInsertionAlertCalled = false;
        bool sellInsertionAlertCalled = false;

        buyOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&buyInsertionAlertCalled](std::shared_ptr<Order> order, uint32_t remainingVolume) {
                    ASSERT_EQ(order->mClientId, 1);
                    ASSERT_EQ(remainingVolume, 5);
                    buyInsertionAlertCalled = true;
                },
        };

        sellOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&sellInsertionAlertCalled](std::shared_ptr<Order> order, uint32_t remainingVolume) {
                    ASSERT_EQ(order->mClientId, 1);
                    ASSERT_EQ(remainingVolume, 5);
                    sellInsertionAlertCalled = true;
                },
        };

        ASSERT_TRUE(mOrderbook.insertOrder(buyOrder));
        ASSERT_TRUE(mOrderbook.insertOrder(sellOrder));

        ASSERT_TRUE(buyInsertionAlertCalled);
        ASSERT_TRUE(sellInsertionAlertCalled);
    }

    TEST_F(OrderbookTestFixture, TestFAKInsertionAlertIsRun)
    {
        auto buyOrder = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::BUY, 99, 5);
        auto sellOrder = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::SELL, 101, 5);

        bool buyInsertionAlertCalled = false;
        bool sellInsertionAlertCalled = false;

        buyOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&buyInsertionAlertCalled](std::shared_ptr<Order> order, uint32_t remainingVolume) {
                    ASSERT_EQ(order->mClientId, 1);
                    ASSERT_EQ(remainingVolume, 0);
                    buyInsertionAlertCalled = true;
                },
        };

        sellOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&sellInsertionAlertCalled](std::shared_ptr<Order> order, uint32_t remainingVolume) {
                    ASSERT_EQ(order->mClientId, 1);
                    ASSERT_EQ(remainingVolume, 0);
                    sellInsertionAlertCalled = true;
                },
        };

        ASSERT_TRUE(mOrderbook.insertOrder(buyOrder));
        ASSERT_TRUE(mOrderbook.insertOrder(sellOrder));

        ASSERT_TRUE(buyInsertionAlertCalled);
        ASSERT_TRUE(sellInsertionAlertCalled);
    }

    TEST_F(OrderbookTestFixture, TestBuyGFDOrderLifecycle)
    {
        auto buyOrder = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::BUY, 100, 5);
        auto sellOrder1 = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::SELL, 97, 3);
        auto sellOrder2 = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::SELL, 95, 3);

        auto buyListenerResults = std::vector<std::pair<uint32_t, uint32_t>>{};
        auto fillListenerResults = std::vector<std::tuple<uint32_t, uint32_t, uint32_t>>{};

        buyOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&buyListenerResults](std::shared_ptr<Order> order, uint32_t remainingVolume) {
                    buyListenerResults.emplace_back(std::make_pair(order->mClientId, remainingVolume));
                },
            .onFill =
                [&fillListenerResults](std::shared_ptr<Order> order, uint32_t volumeFilled, uint32_t price) {
                    fillListenerResults.emplace_back(std::make_tuple(order->mClientId, volumeFilled, price));
                },
        };

        ASSERT_TRUE(mOrderbook.insertOrder(buyOrder));
        ASSERT_TRUE(mOrderbook.insertOrder(sellOrder1));
        ASSERT_TRUE(mOrderbook.insertOrder(sellOrder2));

        ASSERT_EQ(0, buyOrder->mVolume);

        ASSERT_THAT(
            buyListenerResults, testing::ElementsAre(std::make_pair(1, 5), std::make_pair(1, 2), std::make_pair(1, 0)));

        ASSERT_THAT(fillListenerResults, testing::ElementsAre(std::make_tuple(1, 3, 97), std::make_tuple(1, 2, 95)));
    }

    TEST_F(OrderbookTestFixture, TestAskGFDOrderLifecycle)
    {
        auto askOrder = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::ASK, 90, 5);
        auto bidOrder1 = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::BID, 97, 4);
        auto bidOrder2 = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::BID, 95, 2);

        auto buyListenerResults = std::vector<std::pair<uint32_t, uint32_t>>{};
        auto fillListenerResults = std::vector<std::tuple<uint32_t, uint32_t, uint32_t>>{};

        askOrder->mOrderListener = OrderListener{
            .onUpdate =
                [&buyListenerResults](std::shared_ptr<Order> order, uint32_t remainingVolume) {
                    buyListenerResults.emplace_back(std::make_pair(order->mClientId, remainingVolume));
                },
            .onFill =
                [&fillListenerResults](std::shared_ptr<Order> order, uint32_t volumeFilled, uint32_t price) {
                    fillListenerResults.emplace_back(std::make_tuple(order->mClientId, volumeFilled, price));
                },
        };

        ASSERT_TRUE(mOrderbook.insertOrder(askOrder));
        ASSERT_TRUE(mOrderbook.insertOrder(bidOrder1));
        ASSERT_TRUE(mOrderbook.insertOrder(bidOrder2));

        ASSERT_EQ(0, askOrder->mVolume);

        ASSERT_THAT(
            buyListenerResults, testing::ElementsAre(std::make_pair(1, 5), std::make_pair(1, 1), std::make_pair(1, 0)));

        ASSERT_THAT(fillListenerResults, testing::ElementsAre(std::make_tuple(1, 4, 90), std::make_tuple(1, 1, 90)));
    }

    TEST_F(OrderbookTestFixture, TestEarlierAskOrdersHaveQueuePriority)
    {
        auto askOrder1 = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::ASK, 90, 5);
        auto askOrder2 = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::ASK, 90, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(askOrder1));
        ASSERT_TRUE(mOrderbook.insertOrder(askOrder2));

        ASSERT_EQ(askOrder1->mVolume, 5);
        ASSERT_EQ(askOrder2->mVolume, 5);

        auto bidOrder1 = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::BID, 97, 3);
        ASSERT_TRUE(mOrderbook.insertOrder(bidOrder1));

        ASSERT_EQ(askOrder1->mVolume, 2);
        ASSERT_EQ(askOrder2->mVolume, 5);

        auto bidOrder2 = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::BID, 97, 3);
        ASSERT_TRUE(mOrderbook.insertOrder(bidOrder2));

        ASSERT_EQ(askOrder1->mVolume, 0);
        ASSERT_EQ(askOrder2->mVolume, 4);
    }

    TEST_F(OrderbookTestFixture, TestEarlierBidOrdersHaveQueuePriority)
    {
        auto bidOrder1 = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::BID, 90, 5);
        auto bidOrder2 = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::BID, 90, 5);

        ASSERT_TRUE(mOrderbook.insertOrder(bidOrder1));
        ASSERT_TRUE(mOrderbook.insertOrder(bidOrder2));

        ASSERT_EQ(bidOrder1->mVolume, 5);
        ASSERT_EQ(bidOrder2->mVolume, 5);

        auto askOrder1 = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::ASK, 90, 3);
        ASSERT_TRUE(mOrderbook.insertOrder(askOrder1));

        ASSERT_EQ(bidOrder1->mVolume, 2);
        ASSERT_EQ(bidOrder2->mVolume, 5);

        auto askOrder2 = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::ASK, 90, 3);
        ASSERT_TRUE(mOrderbook.insertOrder(askOrder2));

        ASSERT_EQ(bidOrder1->mVolume, 0);
        ASSERT_EQ(bidOrder2->mVolume, 4);
    }

} // namespace Sim::Testing