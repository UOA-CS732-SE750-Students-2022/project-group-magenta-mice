#include "orderbook.h"

namespace Sim {
bool Orderbook::insertOrder(std::unique_ptr<Order> order)
{
    if (order->mSide == Side::BID) {
        return insertBuyOrder(std::move(order));
    } else {
        return insertSellOrder(std::move(order));
    }
}

bool Orderbook::insertBuyOrder(std::unique_ptr<Order> order)
{
    return true;
}

bool Orderbook::insertSellOrder(std::unique_ptr<Order> order)
{
    return true;
}
} // namespace Sim
