#include "orderbook.h"

#include <iterator>
#include <limits>

namespace Sim
{
    bool Orderbook::insertOrder(std::shared_ptr<Order> order)
    {
        if (order->mSide == Side::BID)
        {
            return insertBuyOrder(std::move(order));
        }
        else
        {
            return insertSellOrder(std::move(order));
        }
    }

    bool Orderbook::insertBuyOrder(std::shared_ptr<Order> order)
    {
        uint32_t bidPrice = order->mPrice;

        while (bidPrice > topAskPrice() && order->mVolume > 0)
        {
            auto askOrder = getTopAsk();
            if (askOrder->get()->mVolume >= order->mVolume)
            {
                askOrder->get()->mVolume -= order->mVolume;
                order->mVolume = 0;
                return true;
            }
            else
            {
                order->mVolume -= askOrder->get()->mVolume;
                auto askBegin = mAskOrders.begin();
                askBegin->second.pop_front();
                if (askBegin->second.empty())
                {
                    mAskOrders.erase(askBegin);
                }
            }
        }

        if (order->mLifespan == Lifespan::FAK)
        {
            return true;
        }

        auto it = mBidOrders.find(order->mPrice);
        if (it == mBidOrders.end())
        {
            mBidOrders[order->mPrice] = std::deque<std::shared_ptr<Order>>();
            it = mBidOrders.find(order->mPrice);

            it->second.emplace_back(std::move(order));
        }

        return true;
    }

    bool Orderbook::insertSellOrder(std::shared_ptr<Order> order)
    {
        auto it = mAskOrders.find(order->mPrice);
        if (it == mAskOrders.end())
        {
            mAskOrders[order->mPrice] = std::deque<std::shared_ptr<Order>>();
            it = mAskOrders.find(order->mPrice);

            it->second.emplace_back(std::move(order));
        }

        return true;
    }

    size_t Orderbook::getNumBuyOrders() const { return mBidOrders.size(); }

    size_t Orderbook::getNumSellOrders() const { return mAskOrders.size(); }

    const std::deque<std::shared_ptr<Sim::Order>>::const_iterator Orderbook::getTopBid() const
    {
        return mBidOrders.begin()->second.begin();
    };
    const std::deque<std::shared_ptr<Sim::Order>>::const_iterator Orderbook::getTopAsk() const
    {
        return mAskOrders.begin()->second.begin();
    };

    uint32_t Orderbook::topBidPrice() const
    {
        if (auto levelBegin = mBidOrders.begin(); levelBegin != mBidOrders.end())
        {
            if (auto orderBegin = levelBegin->second.begin(); orderBegin != levelBegin->second.end())
            {
                return orderBegin->get()->mPrice;
            }
        }
        return std::numeric_limits<uint32_t>::min();
    }

    uint32_t Orderbook::topAskPrice() const
    {
        if (auto levelBegin = mAskOrders.begin(); levelBegin != mAskOrders.end())
        {
            if (auto orderBegin = levelBegin->second.begin(); orderBegin != levelBegin->second.end())
            {
                return orderBegin->get()->mPrice;
            }
        }
        return std::numeric_limits<uint32_t>::max();
    }

    std::ostream& operator<<(std::ostream& os, const Orderbook& ob)
    {
        os << "Hi";
        return os;
    }

} // namespace Sim
