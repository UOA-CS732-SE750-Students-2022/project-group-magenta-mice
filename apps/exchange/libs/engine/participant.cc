#include "conversions.h"
#include "participant.h"

#include <functional>

namespace Sim {

bool Participant::checkAndIncrementOrderId(uint32_t id)
{
    if (id != expectedOrderId) {
        return false;
    }
    expectedOrderId++;
    return true;
}

void Participant::requestOrderInsert(Protocol::InsertOrderRequest &order)
{
    if (!checkAndIncrementOrderId(order.clientid())) {
        sendError("Order ID mismatch (out of order)");
        return;
    }

    auto newOrder = mOrderFactory->createOrder(order, [this](Order *order) {
        mOrders.erase(order->mClientId);
        delete order;
    });

    if (this->mRequestOrderInsert.has_value()) {
        this->mOrders[order.clientid()] = newOrder;

        newOrder->mOrderListener = {
            .onUpdate =
                [this](uint32_t order, uint32_t volumeRemaining) {
                    this->handleOrderUpdate(order, volumeRemaining);
                },
            .onFill =
                [this](uint32_t order, uint32_t volumeFilled, uint32_t price) {
                    this->handleOrderFill(order, volumeFilled, price);
                }
        };

        (*this->mRequestOrderInsert)(std::move(newOrder));
    } else {
        throw std::runtime_error("No handler for order insert requests");
    }
}

void Participant::handleOrderUpdate(uint32_t order, uint32_t volumeRemaining)
{
}

void Participant::handleOrderFill(
    uint32_t order,
    uint32_t volumeFilled,
    uint32_t price)
{
}

void Participant::sendError(std::string &&error)
{
}

} // namespace Sim
