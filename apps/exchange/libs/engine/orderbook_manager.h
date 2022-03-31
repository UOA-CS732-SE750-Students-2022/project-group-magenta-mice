#pragma once

#include "orderbook.h"

#include <common/types.h>
#include <tuple>
#include <unordered_map>
#include <vector>

namespace Sim
{
    class OrderbookManager
    {
       public:
        virtual ~OrderbookManager() = default;

        virtual void addInstrument(Instrument instrument);

        virtual size_t size() const;
        virtual void printBooks() const;

        virtual std::vector<std::tuple<uint32_t, const Instrument&>> getInstrumentDefinitions() const;

        virtual bool insertOrder(std::shared_ptr<Order> order);

        const Orderbook& getOrderbook(uint32_t instrument) const;

       private:
        std::unordered_map<uint32_t, Orderbook> mOrderbooks;
        std::unordered_map<uint32_t, Instrument> mInstruments;
    };

} // namespace Sim
