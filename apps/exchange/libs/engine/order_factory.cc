#include "conversions.h"
#include "order_factory.h"

namespace Sim {

std::shared_ptr<Order> OrderFactory::createOrder(
    const Protocol::InsertOrderRequest &order,
    std::function<void(Order *)> deleter)
{
    return std::shared_ptr<Order>(
        new Order{ .mClientId = order.clientid(),
                   .mInstrument = order.instrumentid(),
                   .mLifespan = Conversions::protocolToEngine(order.lifespan()),
                   .mSide = Conversions::protocolToEngine(order.side()),
                   .mPrice = order.price(),
                   .mVolume = order.volume() },
        deleter);
}

} // namespace Sim
