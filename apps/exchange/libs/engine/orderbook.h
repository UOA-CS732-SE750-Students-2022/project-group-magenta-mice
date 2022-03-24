#pragma once

#include <common/types.h>
#include <deque>
#include <iostream>
#include <memory>
#include <unordered_map>

namespace Sim {

class Orderbook {
   public:
    bool insertOrder(std::shared_ptr<Order> order);

    friend std::ostream &operator<<(std::ostream &os, const Orderbook &ob);

   private:
    bool insertBuyOrder(std::shared_ptr<Order> order);
    bool insertSellOrder(std::shared_ptr<Order> order);

    Instrument mInstrument;

    std::unordered_map<int, std::deque<std::shared_ptr<Order>>> mBidOrders;
    std::unordered_map<int, std::deque<std::shared_ptr<Order>>> mAskOrders;
};

} // namespace Sim
