#pragma once

#include <common/types.h>
#include <protocol/exchange.pb.h>

namespace Sim::Conversions {

Side protocolToEngine(Protocol::InsertOrderRequest::Side side);

Lifespan protocolToEngine(Protocol::InsertOrderRequest::Lifespan lifespan);

}  // namespace Sim::Conversions
