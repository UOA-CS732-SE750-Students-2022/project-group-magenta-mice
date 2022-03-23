#include "participant.h"
#include "conversions.h"
#include <functional>

namespace Sim {

bool Participant::checkAndIncrementOrderId(uint32_t id) {
  if (id != expectedOrderId) {
    sendError("Order ID mismatch (out of order)");
    return false;
  }
  expectedOrderId++;
  return true;
}

void Participant::requestOrderInsert(Protocol::InsertOrderRequest& order) {
  if (!checkAndIncrementOrderId(order.clientid())) {
    return;
  }

  OrderOwningPtr newOrder(
      new Order{.mClientId = order.clientid(),
                .mInstrument = order.instrumentid(),
                .mLifespan = Conversions::protocolToEngine(order.lifespan()),
                .mSide = Conversions::protocolToEngine(order.side()),
                .mPrice = order.price(),
                .mVolume = order.volume()},
      [this](Order* order) {
        this->mOrders.erase(order->mClientId);
        delete order;
      });

  if (this->mRequestOrderInsert.has_value()) {
    this->mOrders[order.clientid()] = newOrder.get();
    (*this->mRequestOrderInsert)(std::move(newOrder));
  } else {
    throw std::runtime_error("No handler for order insert requests");
  }
}

void Participant::sendError(std::string&& error) {}

}  // namespace Sim
