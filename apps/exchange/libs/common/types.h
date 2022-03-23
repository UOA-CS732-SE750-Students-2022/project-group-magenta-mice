#pragma once

#include <functional>
#include <memory>
#include <optional>
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
  std::function<void(Order& order)> onUpdate;
  std::function<void(Order& order, int volumeFilled, int price)> onFill;
};

using OrderOwningPtr = std::unique_ptr<Order, std::function<void(Order*)>>;

struct Order {
  Order(const Order&) = delete;
  Order& operator=(const Order&) = delete;

  uint32_t mClientId;
  uint32_t mInstrument;
  Lifespan mLifespan;
  Side mSide;
  uint32_t mPrice;
  uint32_t mVolume;

  std::optional<OrderListener> mOrderListener;
};

}  // namespace Sim
