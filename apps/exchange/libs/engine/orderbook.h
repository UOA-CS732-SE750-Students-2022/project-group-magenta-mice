#pragma once

#include <common/types.h>

namespace Sim {

class Orderbook {
 public:
  bool insertOrder(Order& order);

 private:
  bool insertBuyOrder(Order& order);
  bool insertSellOrder(Order& order);
};

}  // namespace Sim
