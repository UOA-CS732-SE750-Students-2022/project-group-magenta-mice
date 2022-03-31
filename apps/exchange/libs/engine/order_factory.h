#pragma once

#include <common/types.h>
#include <functional>
#include <memory>
#include <protocol/exchange.pb.h>

namespace Sim
{
    class OrderFactory
    {
       public:
        virtual ~OrderFactory() = default;

        virtual OrderOwningPtr createOrder(
            const Protocol::InsertOrderRequest& request,
            std::function<void(Order*)> deleter) const;
    };
} // namespace Sim
