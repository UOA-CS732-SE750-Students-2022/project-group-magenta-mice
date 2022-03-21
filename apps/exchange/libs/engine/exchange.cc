#include "exchange.h"

namespace Sim {

void Exchange::addInstrument(Instrument instrument) {
  auto nextInstrument = mInstruments.size();

  mInstruments.insert(std::make_pair(nextInstrument, instrument));
  mOrderbooks.insert(std::make_pair(nextInstrument, Orderbook()));
}

}  // namespace Sim
