#pragma once

#include <common/types.h>
#include <deque>
#include <iostream>
#include <map>
#include <memory>
#include <optional>

namespace Sim
{
    using BidQueue = std::map<uint32_t, std::deque<OrderOwningPtr>, std::greater<uint32_t>>;
    using AskQueue = std::map<uint32_t, std::deque<OrderOwningPtr>, std::less<uint32_t>>;

    class Orderbook
    {
       public:
        bool insertOrder(OrderOwningPtr order);
        bool cancelOrder(const Order* order);

        friend std::ostream& operator<<(std::ostream& os, const Orderbook& ob);

        size_t getNumBuyOrders() const;
        size_t getNumSellOrders() const;

        const std::deque<OrderOwningPtr>::const_iterator getTopBid() const;
        const std::deque<OrderOwningPtr>::const_iterator getTopAsk() const;

        std::optional<uint32_t> topBidPrice() const;
        std::optional<uint32_t> topAskPrice() const;

        void printBook() const;

       private:
        bool insertBuyOrder(OrderOwningPtr order);
        bool insertSellOrder(OrderOwningPtr order);

        // todo populate this field
        Instrument mInstrument;

        // Price -> Orders
        BidQueue mBidOrders;
        AskQueue mAskOrders;
    };

} // namespace Sim
