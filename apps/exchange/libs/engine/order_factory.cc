#include "conversions.h"
#include "order_factory.h"

namespace Sim
{
    std::shared_ptr<Order> OrderFactory::createOrder(
        const Protocol::InsertOrderRequest& order,
        std::function<void(Order*)> deleter) const
    {
        return std::shared_ptr<Order>(
            new Order(
                order.clientid(),
                order.instrumentid(),
                Conversions::protocolToEngine(order.lifespan()),
                Conversions::protocolToEngine(order.side()),
                order.price(),
                order.volume()),
            deleter);
    }

} // namespace Sim
