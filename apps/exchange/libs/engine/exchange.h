#pragma once

#include "orderbook.h"
#include "participant_manager.h"

#include <common/types.h>
#include <memory>
#include <unordered_map>

namespace Sim {

class Exchange {
   public:
    Exchange(std::unique_ptr<ParticipantManager>);

    void addInstrument(Instrument instrument);
    void addParticipant(std::unique_ptr<Participant> participant);

    bool insertOrder(std::shared_ptr<Order> order);

   private:
    std::unordered_map<int, Orderbook> mOrderbooks;
    std::unordered_map<int, Instrument> mInstruments;
    std::unique_ptr<ParticipantManager> mParticipantManager;
};

} // namespace Sim
