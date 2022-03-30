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

        while (bidPrice >= topAskPrice() && order->mVolume > 0)
        {
            auto counterpartyAsk = getTopAsk();
            if (counterpartyAsk->get()->mVolume >= order->mVolume)
            {
                auto volumeRemoved = order->mVolume;
                auto priceTraded = counterpartyAsk->get()->mPrice;

                if (order->mOrderListener)
                {
                    order->mOrderListener->onFill(order, volumeRemoved, priceTraded);
                    order->mOrderListener->onUpdate(order, order->mVolume - volumeRemoved);
                }
                if (counterpartyAsk->get()->mOrderListener)
                {
                    counterpartyAsk->get()->mOrderListener->onFill(*counterpartyAsk, volumeRemoved, priceTraded);
                    counterpartyAsk->get()->mOrderListener->onUpdate(
                        *counterpartyAsk, counterpartyAsk->get()->mVolume - volumeRemoved);
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
                    order->mOrderListener->onFill(order, volumeRemoved, priceTraded);
                    order->mOrderListener->onUpdate(order, order->mVolume - volumeRemoved);
                }
                if (counterpartyAsk->get()->mOrderListener)
                {
                    counterpartyAsk->get()->mOrderListener->onFill(*counterpartyAsk, volumeRemoved, priceTraded);
                    counterpartyAsk->get()->mOrderListener->onUpdate(
                        *counterpartyAsk, counterpartyAsk->get()->mVolume - volumeRemoved);
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
                order->mOrderListener->onUpdate(order, 0);
            }
            return true;
        }

        auto it = mBidOrders.find(order->mPrice);
        if (it == mBidOrders.end())
        {
            mBidOrders[order->mPrice] = std::deque<std::shared_ptr<Order>>();
        }
        it = mBidOrders.find(order->mPrice);

        if (order->mOrderListener)
        {
            order->mOrderListener->onUpdate(order, order->mVolume);
        }

        it->second.emplace_back(std::move(order));

        return true;
    }

    bool Orderbook::insertSellOrder(std::shared_ptr<Order> order)
    {
        uint32_t askPrice = order->mPrice;

        while (askPrice <= topBidPrice() && order->mVolume > 0)
        {
            auto counterpartyBid = getTopBid();
            if (counterpartyBid->get()->mVolume >= order->mVolume)
            {
                auto volumeRemoved = order->mVolume;
                auto priceTraded = order->mPrice;

                if (order->mOrderListener)
                {
                    order->mOrderListener->onFill(order, volumeRemoved, priceTraded);
                    order->mOrderListener->onUpdate(order, order->mVolume - volumeRemoved);
                }
                if (counterpartyBid->get()->mOrderListener)
                {
                    counterpartyBid->get()->mOrderListener->onFill(*counterpartyBid, volumeRemoved, priceTraded);
                    counterpartyBid->get()->mOrderListener->onUpdate(
                        *counterpartyBid, counterpartyBid->get()->mVolume - volumeRemoved);
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
                    order->mOrderListener->onFill(order, volumeRemoved, priceTraded);
                    order->mOrderListener->onUpdate(order, order->mVolume - volumeRemoved);
                }
                if (counterpartyBid->get()->mOrderListener)
                {
                    counterpartyBid->get()->mOrderListener->onFill(*counterpartyBid, volumeRemoved, priceTraded);
                    counterpartyBid->get()->mOrderListener->onUpdate(
                        *counterpartyBid, counterpartyBid->get()->mVolume - volumeRemoved);
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
                order->mOrderListener->onUpdate(order, 0);
            }
            return true;
        }

        auto it = mAskOrders.find(order->mPrice);
        if (it == mAskOrders.end())
        {
            mAskOrders[order->mPrice] = std::deque<std::shared_ptr<Order>>();
        }
        it = mAskOrders.find(order->mPrice);

        if (order->mOrderListener)
        {
            order->mOrderListener->onUpdate(order, order->mVolume);
        }

        it->second.emplace_back(std::move(order));

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
        for (auto levelBegin = ob.mAskOrders.begin(); levelBegin != ob.mAskOrders.end(); ++levelBegin)
        {
            os << "[" << levelBegin->first << "] Asks: ";
            for (auto orderBegin = levelBegin->second.begin(); orderBegin != levelBegin->second.end(); ++orderBegin)
            {
                os << "[" << orderBegin->get()->mVolume << " @ " << orderBegin->get()->mPrice << "] ";
            }
            os << std::endl;
        }

        for (auto levelBegin = ob.mBidOrders.begin(); levelBegin != ob.mBidOrders.end(); ++levelBegin)
        {
            os << "[" << levelBegin->first << "] Bids: ";
            for (auto orderBegin = levelBegin->second.begin(); orderBegin != levelBegin->second.end(); ++orderBegin)
            {
                os << "[" << orderBegin->get()->mVolume << " @ " << orderBegin->get()->mPrice << "] ";
            }
            os << std::endl;
        }

        return os;
    }

} // namespace Sim
