#pragma once

#include <common/types.h>
#include <deque>
#include <memory>
#include <unordered_map>

namespace Sim {

class Orderbook {
   public:
    bool insertOrder(std::unique_ptr<Order> order);

   private:
    bool insertBuyOrder(std::unique_ptr<Order> order);
    bool insertSellOrder(std::unique_ptr<Order> order);

    Instrument mInstrument;

    std::unordered_map<int, std::deque<std::unique_ptr<Order>>> mBidOrders;
    std::unordered_map<int, std::deque<std::unique_ptr<Order>>> mAskOrders;
};

} // namespace Sim
