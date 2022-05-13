#include "conversions.h"
#include "participant.h"

#include <cmath>
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

    void Participant::setMessageSender(std::function<void(int, const std::string&)>&& handler)
    {
        mMessageHandler.emplace(std::move(handler));
    }

    void Participant::setErrorHandler(std::function<void(const std::string&)>&& handler)
    {
        mErrorHandler.emplace(std::move(handler));
    }

    bool Participant::isLoggedIn() const { return mLoggedIn; }
    void Participant::login(std::string userId)
    {
        mLoggedIn = true;
        mUserId = userId;
    }

    bool Participant::requestOrderInsert(Protocol::InsertOrderRequest& order)
    {
        if (!checkAndIncrementOrderId(order.clientid()))
        {
            raiseError("Order ID mismatch (out of order)");
            return false;
        }

        if (order.volume() == 0)
        {
            raiseError(
                "Invalid order with price:" + std::to_string(order.price()) +
                "and volume:" + std::to_string(order.volume()));
            return false;
        }

        auto tickSize = mConfig.getInstruments().at(order.instrumentid()).mTickSizeCents;
        if (order.price() % tickSize != 0)
        {
            raiseError("Invalid Order! Price: [" + std::to_string(order.price()) + "] is not a valid tick size.");
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
            std::vector<uint> toCancel;
            for (auto& [id, order] : mOrders)
            {
                toCancel.emplace_back(id);
            }

            for (auto& id : toCancel)
            {
                (*this->mRequestCancelOrder)(mOrders.at(id));
            }

            return true;
        }
        else
        {
            throw std::runtime_error("No handler for order cancel requests");
        }
    }

    void Participant::upgrade()
    {
        mMarketMaker = true;
        mLoggedIn = true;
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

        if (!mMarketMaker &&
            std::abs(mPositions[order.mInstrument]) > mConfig.getInstruments().at(order.mInstrument).mPositionLimit)
        {
            raiseError("Position limit exceeded");
        }

        Protocol::OrderFillMessage message;
        message.set_clientid(order.mClientId);
        message.set_instrumentid(order.mInstrument);
        message.set_volumefilled(volumeFilled);
        message.set_price(price);
        sendMessage(Protocol::ORDER_FILL, message.SerializeAsString());

        auto side = order.mSide;
        auto inst = order.mInstrument;

        // don't write market maker trades to the db
        if (!mMarketMaker)
        {
            mDb.futureExec([side, inst, volumeFilled, price, this](pqxx::work& w) {
                return w.exec_params(
                    "INSERT INTO public.\"Trade\" (\"exchangeId\", \"userId\", \"instrumentId\", price, volume, side) "
                    "VALUES ($1, $2, $3, $4, $5, $6)",
                    mConfig.getExchangeId(),
                    this->mUserId,
                    this->mConfig.getInstruments().at(inst).mId,
                    price,
                    volumeFilled,
                    side == Side::BID ? "BID" : "ASK");
            });
        }
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

    void Participant::sendMessage(int messageType, const std::string& message)
    {
        if (mMessageHandler.has_value())
        {
            (*mMessageHandler)(messageType, message);
        }
    }

    void Participant::raiseError(const std::string& message)
    {
        if (mErrorHandler.has_value())
        {
            (*mErrorHandler)(message);
        }
    }

} // namespace Sim
