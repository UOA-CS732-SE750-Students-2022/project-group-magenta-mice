#include "orderbook.h"

#include <iterator>
#include <limits>

namespace Sim
{
    bool Orderbook::cancelOrder(const Order* order)
    {
        if (order->mSide == Side::BID)
        {
            auto it = mBidOrders.find(order->mPrice);
            if (it != mBidOrders.end())
            {
                auto& orders = it->second;
                auto orderIt =
                    std::find_if(orders.begin(), orders.end(), [order](const OrderOwningPtr& owningOrderPtr) {
                        return owningOrderPtr.get() == order;
                    });
                if (orderIt != orders.end())
                {
                    orders.erase(orderIt);
                    if (orders.empty())
                    {
                        mBidOrders.erase(it);
                    }
                    return true;
                }
            }
        }
        else
        {
            auto it = mAskOrders.find(order->mPrice);
            if (it != mAskOrders.end())
            {
                auto& orders = it->second;
                auto orderIt =
                    std::find_if(orders.begin(), orders.end(), [order](const OrderOwningPtr& owningOrderPtr) {
                        return owningOrderPtr.get() == order;
                    });
                if (orderIt != orders.end())
                {
                    orders.erase(orderIt);
                    if (orders.empty())
                    {
                        mAskOrders.erase(it);
                    }
                    return true;
                }
            }
        }
        return false;
    }

    bool Orderbook::insertOrder(OrderOwningPtr order)
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

    bool Orderbook::insertBuyOrder(OrderOwningPtr order)
    {
        uint32_t bidPrice = order->mPrice;

        for (auto topAsk = topAskPrice(); topAsk.has_value() && bidPrice >= topAsk.value() && order->mVolume > 0;
             topAsk = topAskPrice())
        {
            auto counterpartyAsk = getTopAsk();
            if (counterpartyAsk->get()->mVolume > order->mVolume)
            {
                auto volumeRemoved = order->mVolume;
                auto priceTraded = counterpartyAsk->get()->mPrice;

                if (order->mOrderListener)
                {
                    order->mOrderListener->onFill(*order, volumeRemoved, priceTraded);
                    order->mOrderListener->onUpdate(*order, order->mVolume - volumeRemoved);
                }
                if (counterpartyAsk->get()->mOrderListener)
                {
                    counterpartyAsk->get()->mOrderListener->onFill(**counterpartyAsk, volumeRemoved, priceTraded);
                    counterpartyAsk->get()->mOrderListener->onUpdate(
                        **counterpartyAsk, counterpartyAsk->get()->mVolume - volumeRemoved);
                }

                counterpartyAsk->get()->mVolume -= volumeRemoved;
                order->mVolume = 0;
                return true;
            }
            else
            {
                auto volumeRemoved = counterpartyAsk->get()->mVolume;
                auto priceTraded = counterpartyAsk->get()->mPrice;

                if (order->mOrderListener)
                {
                    order->mOrderListener->onFill(*order, volumeRemoved, priceTraded);
                    order->mOrderListener->onUpdate(*order, order->mVolume - volumeRemoved);
                }
                if (counterpartyAsk->get()->mOrderListener)
                {
                    counterpartyAsk->get()->mOrderListener->onFill(**counterpartyAsk, volumeRemoved, priceTraded);
                    counterpartyAsk->get()->mOrderListener->onUpdate(
                        **counterpartyAsk, counterpartyAsk->get()->mVolume - volumeRemoved);
                }

                order->mVolume -= volumeRemoved;
                counterpartyAsk->get()->mVolume -= volumeRemoved;
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
            if (order->mOrderListener)
            {
                order->mOrderListener->onUpdate(*order, 0);
            }
            return true;
        }

        if (order->mVolume == 0)
        {
            return true;
        }

        auto it = mBidOrders.find(order->mPrice);
        if (it == mBidOrders.end())
        {
            mBidOrders[order->mPrice] = std::deque<OrderOwningPtr>();
        }
        it = mBidOrders.find(order->mPrice);

        if (order->mOrderListener)
        {
            order->mOrderListener->onUpdate(*order, order->mVolume);
        }

        it->second.emplace_back(std::move(order));

        return true;
    }

    bool Orderbook::insertSellOrder(OrderOwningPtr order)
    {
        uint32_t askPrice = order->mPrice;

        for (auto topBid = topBidPrice(); topBid.has_value() && askPrice <= topBid.value() && order->mVolume > 0;
             topBid = topBidPrice())
        {
            auto counterpartyBid = getTopBid();
            if (counterpartyBid->get()->mVolume > order->mVolume)
            {
                auto volumeRemoved = order->mVolume;
                auto priceTraded = order->mPrice;

                if (order->mOrderListener)
                {
                    order->mOrderListener->onFill(*order, volumeRemoved, priceTraded);
                    order->mOrderListener->onUpdate(*order, order->mVolume - volumeRemoved);
                }
                if (counterpartyBid->get()->mOrderListener)
                {
                    counterpartyBid->get()->mOrderListener->onFill(**counterpartyBid, volumeRemoved, priceTraded);
                    counterpartyBid->get()->mOrderListener->onUpdate(
                        **counterpartyBid, counterpartyBid->get()->mVolume - volumeRemoved);
                }

                counterpartyBid->get()->mVolume -= volumeRemoved;
                order->mVolume = 0;
                return true;
            }
            else
            {
                auto volumeRemoved = counterpartyBid->get()->mVolume;
                auto priceTraded = order->mPrice;

                if (order->mOrderListener)
                {
                    order->mOrderListener->onFill(*order, volumeRemoved, priceTraded);
                    order->mOrderListener->onUpdate(*order, order->mVolume - volumeRemoved);
                }
                if (counterpartyBid->get()->mOrderListener)
                {
                    counterpartyBid->get()->mOrderListener->onFill(**counterpartyBid, volumeRemoved, priceTraded);
                    counterpartyBid->get()->mOrderListener->onUpdate(
                        **counterpartyBid, counterpartyBid->get()->mVolume - volumeRemoved);
                }

                order->mVolume -= volumeRemoved;
                counterpartyBid->get()->mVolume -= volumeRemoved;
                auto bidBegin = mBidOrders.begin();
                bidBegin->second.pop_front();
                if (bidBegin->second.empty())
                {
                    mBidOrders.erase(bidBegin);
                }
            }
        }

        if (order->mLifespan == Lifespan::FAK)
        {
            if (order->mOrderListener)
            {
                order->mOrderListener->onUpdate(*order, 0);
            }
            return true;
        }

        if (order->mVolume == 0)
        {
            return true;
        }

        auto it = mAskOrders.find(order->mPrice);
        if (it == mAskOrders.end())
        {
            mAskOrders[order->mPrice] = std::deque<OrderOwningPtr>();
        }
        it = mAskOrders.find(order->mPrice);

        if (order->mOrderListener)
        {
            order->mOrderListener->onUpdate(*order, order->mVolume);
        }

        it->second.emplace_back(std::move(order));

        return true;
    }

    size_t Orderbook::getNumBuyOrders() const { return mBidOrders.size(); }

    size_t Orderbook::getNumSellOrders() const { return mAskOrders.size(); }

    const std::deque<OrderOwningPtr>::const_iterator Orderbook::getTopBid() const
    {
        return mBidOrders.begin()->second.begin();
    };
    const std::deque<OrderOwningPtr>::const_iterator Orderbook::getTopAsk() const
    {
        return mAskOrders.begin()->second.begin();
    };

    std::optional<uint32_t> Orderbook::topBidPrice() const
    {
        if (auto levelBegin = mBidOrders.begin(); levelBegin != mBidOrders.end())
        {
            if (auto orderBegin = levelBegin->second.begin(); orderBegin != levelBegin->second.end())
            {
                return orderBegin->get()->mPrice;
            }
        }
        return {};
    }

    std::optional<uint32_t> Orderbook::topAskPrice() const
    {
        if (auto levelBegin = mAskOrders.begin(); levelBegin != mAskOrders.end())
        {
            if (auto orderBegin = levelBegin->second.begin(); orderBegin != levelBegin->second.end())
            {
                return orderBegin->get()->mPrice;
            }
        }
        return {};
    }

    std::vector<std::pair<uint32_t, uint32_t>> Orderbook::getTopAskLevels(uint32_t maxSize) const
    {
        auto list = std::vector<std::pair<uint32_t, uint32_t>>();

        // Iterate through each price level
        for (auto levelBegin = mAskOrders.begin(); levelBegin != mAskOrders.end() && list.size() < maxSize;
             ++levelBegin)
        {
            if (auto orderBegin = levelBegin->second.begin(); orderBegin != levelBegin->second.end())
            {
                uint32_t volumeCount = 0;
                // reduce to volume of each order in the price level
                for (auto order = orderBegin; order != levelBegin->second.end(); ++order)
                {
                    volumeCount += order->get()->mVolume;
                }

                list.emplace_back(levelBegin->first, volumeCount);
            }
        }

        return list;
    }

    std::vector<std::pair<uint32_t, uint32_t>> Orderbook::getTopBidLevels(uint32_t maxSize) const
    {
        auto list = std::vector<std::pair<uint32_t, uint32_t>>();

        for (auto levelBegin = mBidOrders.begin(); levelBegin != mBidOrders.end() && list.size() < maxSize;
             ++levelBegin)
        {
            if (auto orderBegin = levelBegin->second.begin(); orderBegin != levelBegin->second.end())
            {
                uint32_t volumeCount = 0;
                for (auto order = orderBegin; order != levelBegin->second.end(); ++order)
                {
                    volumeCount += order->get()->mVolume;
                }

                list.emplace_back(levelBegin->first, volumeCount);
            }
        }

        return list;
    }

    std::ostream& operator<<(std::ostream& os, const Orderbook& ob)
    {
        for (auto levelBegin = ob.mAskOrders.begin(); levelBegin != ob.mAskOrders.end(); ++levelBegin)
        {
            os << "[" << levelBegin->first << "] Asks: ";
            for (auto orderBegin = levelBegin->second.begin(); orderBegin != levelBegin->second.end(); ++orderBegin)
            {
                os << "[" << orderBegin->get()->mVolume << "] ";
            }
            os << std::endl;
        }

        for (auto levelBegin = ob.mBidOrders.begin(); levelBegin != ob.mBidOrders.end(); ++levelBegin)
        {
            os << "[" << levelBegin->first << "] Bids: ";
            for (auto orderBegin = levelBegin->second.begin(); orderBegin != levelBegin->second.end(); ++orderBegin)
            {
                os << "[" << orderBegin->get()->mVolume << "] ";
            }
            os << std::endl;
        }

        return os;
    }

} // namespace Sim
