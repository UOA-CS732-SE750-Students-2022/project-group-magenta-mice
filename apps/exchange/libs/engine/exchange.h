#pragma once

#include "orderbook.h"
#include "participant.h"
#include <common/types.h>
#include <unordered_map>

namespace Sim {

class Exchange {
 public:
  void addInstrument(Instrument instrument);

  void insertOrder(Order& order);

 private:
  std::unordered_map<int, Orderbook> mOrderbooks;
  std::unordered_map<int, Instrument> mInstruments;
  std::unordered_map<int, Participant> mParticipants;
};

}  // namespace Sim
