#pragma once

#include <functional>
#include <memory>
#include <optional>
#include <string>

namespace Sim
{
    struct Instrument
    {
        std::string mName;
        uint32_t mPositionLimit;
        uint32_t mTickSizeCents;

        bool operator==(const Instrument& rhs) const;
    };

    enum class Lifespan
    {
        GFD = 0,
        GOOD_FOR_DAY = GFD,
        G = GFD,

        FAK = 1,
        FILL_AND_KILL = FAK,
        F = FAK,
    };

    enum class Side
    {
        BUY = 0,
        BID = BUY,
        B = BUY,

        SELL = 1,
        ASK = SELL,
        A = SELL
    };

    struct Order;

    struct OrderListener
    {
        std::function<void(const Order& order, uint32_t volumeRemaining)> onUpdate = [](const Order&, uint32_t) {};
        std::function<void(const Order& order, uint32_t volumeFilled, uint32_t price)> onFill =
            [](const Order&, uint32_t, uint32_t) {};
    };

    struct Order
    {
        Order(const Order&) = delete;
        Order& operator=(const Order&) = delete;

        Order(uint32_t clientId, uint32_t instrumentId, Lifespan lifespan, Side side, uint32_t price, uint32_t volume)
            : mClientId(clientId),
              mInstrument(instrumentId),
              mLifespan(lifespan),
              mSide(side),
              mPrice(price),
              mVolume(volume)
        {}

        uint32_t mClientId;
        uint32_t mInstrument;
        Lifespan mLifespan;
        Side mSide;
        uint32_t mPrice;
        uint32_t mVolume;

        std::optional<OrderListener> mOrderListener;
    };

    using OrderOwningPtr = std::unique_ptr<Order, std::function<void(Order*)>>;

} // namespace Sim
