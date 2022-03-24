#include "test_common.h"

#include <common/types.h>
#include <engine/order_factory.h>
#include <protocol/exchange.pb.h>

namespace Sim::Testing {
struct OrderFactoryTestFixture : public Test {
    OrderFactoryTestFixture()
    {
        mOrderFactory = std::make_unique<OrderFactory>();
    }

   protected:
    std::unique_ptr<OrderFactory> mOrderFactory;
};

TEST_F(OrderFactoryTestFixture, CreateOrder_ReturnsOrder)
{
    Protocol::InsertOrderRequest order;
    order.set_clientid(1);
    order.set_instrumentid(2);
    order.set_lifespan(Protocol::InsertOrderRequest::FAK);
    order.set_side(Protocol::InsertOrderRequest::BUY);
    order.set_price(3);
    order.set_volume(4);

    auto orderPtr =
        mOrderFactory->createOrder(order, [](Order *order) { delete order; });
    ASSERT_EQ(orderPtr->mClientId, 1);
    ASSERT_EQ(orderPtr->mInstrument, 2);
    ASSERT_EQ(orderPtr->mLifespan, Lifespan::FAK);
    ASSERT_EQ(orderPtr->mSide, Side::BUY);
    ASSERT_EQ(orderPtr->mPrice, 3);
    ASSERT_EQ(orderPtr->mVolume, 4);
}

TEST_F(OrderFactoryTestFixture, CreateOrder_DeleterCalled)
{
    Protocol::InsertOrderRequest order;
    order.set_clientid(1);

    bool modified = false;

    {
        auto orderPtr =
            mOrderFactory->createOrder(order, [&modified](Order *order) {
                modified = true;
                delete order;
            });
        ASSERT_EQ(orderPtr->mClientId, 1);
        ASSERT_FALSE(modified);
    }

    ASSERT_TRUE(modified);
}

} // namespace Sim::Testing
