#pragma once

#include <common/types.h>
#include <deque>
#include <iostream>
#include <map>
#include <memory>
#include <optional>

namespace Sim
{
    using BidQueue = std::map<uint32_t, std::deque<std::shared_ptr<Order>>, std::greater<uint32_t>>;
    using AskQueue = std::map<uint32_t, std::deque<std::shared_ptr<Order>>, std::less<uint32_t>>;

    class Orderbook
    {
       public:
        bool insertOrder(std::shared_ptr<Order> order);

        friend std::ostream& operator<<(std::ostream& os, const Orderbook& ob);

        size_t getNumBuyOrders() const;
        size_t getNumSellOrders() const;

        const std::deque<std::shared_ptr<Sim::Order>>::const_iterator getTopBid() const;
        const std::deque<std::shared_ptr<Sim::Order>>::const_iterator getTopAsk() const;

        uint32_t topBidPrice() const;
        uint32_t topAskPrice() const;

       private:
        bool insertBuyOrder(std::shared_ptr<Order> order);
        bool insertSellOrder(std::shared_ptr<Order> order);

        Instrument mInstrument;

        // Price -> Orders
        BidQueue mBidOrders;
        AskQueue mAskOrders;
    };

} // namespace Sim
