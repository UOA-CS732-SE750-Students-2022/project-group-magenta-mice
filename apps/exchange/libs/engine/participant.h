#pragma once

#include <common/emitter.h>
#include <common/types.h>
#include <protocol/exchange.pb.h>
#include <memory>
#include <optional>
#include <unordered_map>

namespace Sim {

class Participant {
 public:
  Participant() = default;

  void requestOrderInsert(Protocol::InsertOrderRequest& order);

  void sendError(std::string&& error);

  void setOrderInsertionHandler(std::function<bool(OrderOwningPtr)>&& handler) {
    mRequestOrderInsert.emplace(std::move(handler));
  }

 private:
  bool checkAndIncrementOrderId(uint32_t id);

  uint64_t expectedOrderId = 0;

  std::unordered_map<int, Order*> mOrders;

  std::optional<std::function<bool(OrderOwningPtr)>> mRequestOrderInsert;
};

}  // namespace Sim
