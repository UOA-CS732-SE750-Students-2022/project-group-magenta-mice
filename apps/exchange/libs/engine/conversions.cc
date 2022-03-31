#include "conversions.h"

namespace Sim::Conversions
{
    Side protocolToEngine(Protocol::InsertOrderRequest::Side side)
    {
        switch (side)
        {
        case Protocol::InsertOrderRequest::BUY: return Side::BUY;
        case Protocol::InsertOrderRequest::SELL: return Side::SELL;
        default: throw std::runtime_error("Unknown side");
        }
    }

    Lifespan protocolToEngine(Protocol::InsertOrderRequest::Lifespan lifespan)
    {
        switch (lifespan)
        {
        case Protocol::InsertOrderRequest::GFD: return Lifespan::GFD;
        case Protocol::InsertOrderRequest::FAK: return Lifespan::FAK;
        default: throw std::runtime_error("Unknown lifespan");
        }
    }

} // namespace Sim::Conversions
