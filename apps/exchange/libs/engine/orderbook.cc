#include "orderbook.h"

namespace Sim {
bool Orderbook::insertOrder(std::shared_ptr<Order> order)
{
    if (order->mSide == Side::BID) {
        return insertBuyOrder(std::move(order));
    } else {
        return insertSellOrder(std::move(order));
    }
}

bool Orderbook::insertBuyOrder(std::shared_ptr<Order> order)
{
    return true;
}

bool Orderbook::insertSellOrder(std::shared_ptr<Order> order)
{
    return true;
}

std::ostream &operator<<(std::ostream &os, const Orderbook &ob)
{
    os << "Hi";
    return os;
}

} // namespace Sim
