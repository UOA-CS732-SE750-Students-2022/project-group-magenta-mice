#pragma once

#include "order_factory.h"

#include <common/types.h>
#include <memory>
#include <optional>
#include <protocol/exchange.pb.h>
#include <unordered_map>

namespace Sim {

class Participant {
   public:
    Participant(std::unique_ptr<OrderFactory> orderFactory)
        : mOrderFactory{ std::move(orderFactory) } {};

    void requestOrderInsert(Protocol::InsertOrderRequest &order);

    void sendError(std::string &&error);

    void setOrderInsertionHandler(
        std::function<bool(std::shared_ptr<Order>)> &&handler)
    {
        mRequestOrderInsert.emplace(std::move(handler));
    }

    void handleOrderUpdate(uint32_t order, uint32_t volumeRemaining);
    void handleOrderFill(uint32_t order, uint32_t volumeFilled, uint32_t price);

   private:
    bool checkAndIncrementOrderId(uint32_t id);

    std::unique_ptr<OrderFactory> mOrderFactory;

    uint64_t expectedOrderId = 0;

    std::unordered_map<int, std::weak_ptr<Order>> mOrders;
    std::optional<std::function<bool(std::shared_ptr<Order>)>>
        mRequestOrderInsert;
};

} // namespace Sim
