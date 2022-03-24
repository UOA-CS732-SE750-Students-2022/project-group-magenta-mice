#pragma once

#include "orderbook.h"

#include <common/types.h>
#include <unordered_map>

namespace Sim {

class OrderbookManager {
   public:
    virtual ~OrderbookManager() = default;

    virtual void addInstrument(Instrument instrument);

    virtual size_t size() const;
    virtual void printBooks() const;

   private:
    std::unordered_map<int, Orderbook> mOrderbooks;
    std::unordered_map<int, Instrument> mInstruments;
};

} // namespace Sim
