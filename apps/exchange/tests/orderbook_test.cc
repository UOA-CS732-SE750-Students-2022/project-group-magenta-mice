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

    TEST_F(OrderbookTestFixture, TestExistingGfdIsTradedWith)
    {
        auto order = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::SELL, 99, 5);

        auto order1 = std::make_shared<Order>(1, 1, Lifespan::FAK, Side::BUY, 100, 2);
        auto order2 = std::make_shared<Order>(1, 1, Lifespan::GFD, Side::BUY, 100, 2);

        ASSERT_TRUE(mOrderbook.insertOrder(order));
        ASSERT_EQ(5, mOrderbook.getTopAsk()->get()->mVolume);

        ASSERT_TRUE(mOrderbook.insertOrder(order1));
        ASSERT_EQ(3, mOrderbook.getTopAsk()->get()->mVolume);

        ASSERT_TRUE(mOrderbook.insertOrder(order2));
        ASSERT_EQ(1, mOrderbook.getTopAsk()->get()->mVolume);
    }

} // namespace Sim::Testing