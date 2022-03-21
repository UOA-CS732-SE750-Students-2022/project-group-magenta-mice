#pragma once

#include <functional>
#include <string>

namespace Sim {

struct Instrument {
  std::string mName;
  int mPositionLimit;
  int mTickSizeCents;
};

enum class Lifespan {
  GFD = 0,
  GOOD_FOR_DAY = GFD,
  G = GFD,

  FAK = 1,
  FILL_AND_KILL = FAK,
  F = FAK,
};

enum class Side {
  BUY = 0,
  BID = BUY,
  B = BUY,

  SELL = 1,
  ASK = SELL,
  A = SELL
};

struct Order;

struct OrderListener {
  std::function<void(Order& order, int volumeChange)> onAmend;
  std::function<void(Order& order, int volumeChange)> onCancel;
  std::function<void(Order& order)> onInsert;
  std::function<void(Order& order, int volumeFilled, int price)> onFill;
};

struct Order {
  int mClientId;
  Instrument mInstrument;
  Lifespan mLifespan;
  Side mSide;
  int mPrice;
  int mVolume;

  OrderListener orderListener;
};

}  // namespace Sim
