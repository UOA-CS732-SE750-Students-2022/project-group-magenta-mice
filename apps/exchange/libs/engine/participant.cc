#include "conversions.h"
#include "participant.h"

#include <functional>

namespace Sim
{
    bool Participant::checkAndIncrementOrderId(uint32_t id)
    {
        if (id != expectedOrderId)
        {
            return false;
        }
        expectedOrderId++;
        return true;
    }

    void Participant::setOrderInsertionHandler(std::function<bool(std::shared_ptr<Order>)>&& handler)
    {
        mRequestOrderInsert.emplace(std::move(handler));
    }

    void Participant::setOrderCancellationHandler(std::function<bool(std::shared_ptr<Order>)>&& handler)
    {
        mRequestCancelOrder.emplace(std::move(handler));
    }

    bool Participant::requestOrderInsert(Protocol::InsertOrderRequest& order)
    {
        if (!checkAndIncrementOrderId(order.clientid()))
        {
            sendError("Order ID mismatch (out of order)");
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
            this->mOrders[order.clientid()] = newOrder;

            newOrder->mOrderListener = { .onUpdate =
                                             [this](std::shared_ptr<Order> order, uint32_t volumeRemaining) {
                                                 this->handleOrderUpdate(order, volumeRemaining);
                                             },
                                         .onFill =
                                             [this](
                                                 std::shared_ptr<Order> order, uint32_t volumeFilled, uint32_t price) {
                                                 this->handleOrderFill(order, volumeFilled, price);
                                             } };

            (*this->mRequestOrderInsert)(std::move(newOrder));
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
                (*this->mRequestCancelOrder)(it->second.lock());
                return true;
            }
            else
            {
                sendError("Order ID not found");
                return false;
            }
        }
        else
        {
            throw std::runtime_error("No handler for order cancel requests");
        }
    }

    void Participant::handleOrderUpdate(std::shared_ptr<Order> order, uint32_t volumeRemaining) {}

    void Participant::handleOrderFill(std::shared_ptr<Order> order, uint32_t volumeFilled, uint32_t price)
    {
        if (order->mSide == Side::BID)
        {
            mPositions[order->mInstrument] += volumeFilled;
            mCash -= volumeFilled * price;
        }
        else
        {
            mPositions[order->mInstrument] -= volumeFilled;
            mCash += volumeFilled * price;
        }
    }

    void Participant::sendError(std::string&& error) { std::cout << "Error: " << error << std::endl; }

    int64_t Participant::getCash() const { return mCash; }
    int32_t Participant::getPosition(uint32_t forInstrument) const
    {
        if (mPositions.count(forInstrument) == 0)
        {
            return 0;
        }
        return mPositions.at(forInstrument);
    }

} // namespace Sim
