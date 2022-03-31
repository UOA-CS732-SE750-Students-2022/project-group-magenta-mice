#pragma once

#include "order_factory.h"

#include <common/types.h>
#include <memory>
#include <optional>
#include <protocol/exchange.pb.h>
#include <unordered_map>

namespace Sim
{
    class Participant
    {
       public:
        Participant(std::unique_ptr<OrderFactory> orderFactory) : mOrderFactory{ std::move(orderFactory) } {};

        bool requestOrderInsert(Protocol::InsertOrderRequest& order);

        void sendError(std::string&& error);

        void setOrderInsertionHandler(std::function<bool(std::shared_ptr<Order>)>&& handler)
        {
            mRequestOrderInsert.emplace(std::move(handler));
        }

        void handleOrderUpdate(std::shared_ptr<Order> order, uint32_t volumeRemaining);
        void handleOrderFill(std::shared_ptr<Order> order, uint32_t volumeFilled, uint32_t price);

        int64_t getCash() const;
        int32_t getPosition(uint32_t forInstrument) const;

       private:
        bool checkAndIncrementOrderId(uint32_t id);

        std::unique_ptr<OrderFactory> mOrderFactory;

        uint64_t expectedOrderId = 0;

        std::unordered_map<uint32_t, std::weak_ptr<Order>> mOrders;
        std::optional<std::function<bool(std::shared_ptr<Order>)>> mRequestOrderInsert;

        std::unordered_map<uint32_t, int32_t> mPositions;
        int64_t mCash = 0;
    };

} // namespace Sim
