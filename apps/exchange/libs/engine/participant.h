#pragma once

#include <common/types.h>
#include <unordered_map>

namespace Sim {

class Participant {
 public:
 private:
  std::unordered_map<int, Order> mOrders;
};

}  // namespace Sim
