#include "conversions.h"
#include "participant.h"

#include <functional>

namespace Sim
{
    void Participant::setId(uint32_t id) { mIdentifier = id; }

    uint32_t Participant::getId() const { return mIdentifier; }

    bool Participant::checkAndIncrementOrderId(uint32_t id)
    {
        if (id != expectedOrderId)
        {
            return false;
        }
        expectedOrderId++;
        return true;
    }

    void Participant::setOrderInsertionHandler(std::function<bool(OrderOwningPtr)>&& handler)
    {
        mRequestOrderInsert.emplace(std::move(handler));
    }

    void Participant::setOrderCancellationHandler(std::function<bool(const Order*)>&& handler)
    {
        mRequestCancelOrder.emplace(std::move(handler));
    }

    bool Participant::requestOrderInsert(Protocol::InsertOrderRequest& order)
    {
        if (!checkAndIncrementOrderId(order.clientid()))
        {
            raiseError("Order ID mismatch (out of order)");
            return false;
        }

        auto newOrder = mOrderFactory->createOrder(order, [this](Order* order) {
            if (mOrders.size())
            {
                mOrders.erase(order->mClientId);
            }
            delete order;
        });

        if (this->mRequestOrderInsert.has_value())
        {
            this->mOrders[order.clientid()] = newOrder.get();

            newOrder->mOrderListener = { .onUpdate =
                                             [this](const Order& order, uint32_t volumeRemaining) {
                                                 this->handleOrderUpdate(order, volumeRemaining);
                                             },
                                         .onFill =
                                             [this](const Order& order, uint32_t volumeFilled, uint32_t price) {
                                                 this->handleOrderFill(order, volumeFilled, price);
                                             } };

            (*mRequestOrderInsert)(std::move(newOrder));
            return true;
        }
        else
        {
            throw std::runtime_error("No handler for order insert requests");
        }
    }

    bool Participant::requestOrderCancel(Protocol::CancelOrderRequest& order)
    {
        if (this->mRequestCancelOrder.has_value())
        {
            auto it = mOrders.find(order.clientid());
            if (it != mOrders.end())
            {
                (*this->mRequestCancelOrder)(it->second);
                return true;
            }
            else
            {
                raiseError("Order ID not found");
                return false;
            }
        }
        else
        {
            throw std::runtime_error("No handler for order cancel requests");
        }
    }

    bool Participant::prepareLogout()
    {
        if (this->mRequestCancelOrder.has_value())
        {
            for (auto& order : mOrders)
            {
                (*this->mRequestCancelOrder)(order.second);
            }
            return true;
        }
        else
        {
            throw std::runtime_error("No handler for order cancel requests");
        }
    }

    void Participant::handleOrderUpdate(const Order& order, uint32_t volumeRemaining)
    {
        Protocol::OrderUpdateMessage message;
        message.set_clientid(order.mClientId);
        message.set_instrumentid(order.mInstrument);
        message.set_volumeremaining(volumeRemaining);

        sendMessage(Protocol::ORDER_UPDATE, message.SerializeAsString());
    }

    void Participant::handleOrderFill(const Order& order, uint32_t volumeFilled, uint32_t price)
    {
        if (order.mSide == Side::BID)
        {
            mPositions[order.mInstrument] += volumeFilled;
            mCash -= volumeFilled * price;
        }
        else
        {
            mPositions[order.mInstrument] -= volumeFilled;
            mCash += volumeFilled * price;
        }

        Protocol::OrderFillMessage message;
        message.set_clientid(order.mClientId);
        message.set_instrumentid(order.mInstrument);
        message.set_volumefilled(volumeFilled);
        message.set_price(price);

        sendMessage(Protocol::ORDER_FILL, message.SerializeAsString());
    }

    int64_t Participant::getCash() const { return mCash; }
    int32_t Participant::getPosition(uint32_t forInstrument) const
    {
        if (mPositions.count(forInstrument) == 0)
        {
            return 0;
        }
        return mPositions.at(forInstrument);
    }

    void Participant::diagnose() const
    {
        std::cout << "-------- " << mIdentifier << " --------" << std::endl;
        std::cout << "Cash: " << mCash << std::endl;
        for (auto const& [instrument, position] : mPositions)
        {
            std::cout << "Position for " << instrument << ": " << position << std::endl;
        }
    }

} // namespace Sim
