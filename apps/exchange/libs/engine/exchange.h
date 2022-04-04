#pragma once

#include "orderbook.h"
#include "orderbook_manager.h"
#include "participant_manager.h"

#include <common/types.h>
#include <memory>
#include <unordered_map>

namespace Sim
{
    class Exchange
    {
       public:
        Exchange(std::unique_ptr<ParticipantManager>, std::unique_ptr<OrderbookManager>);

        void addInstrument(Instrument instrument);
        void addParticipant(std::shared_ptr<Participant> participant);

        void printBooks() const;

        Protocol::LoginResponse getExchangeInstruments();

        const Orderbook& getOrderbook(uint32_t instrument) const;

        void applyToAllParticipants(std::function<void(Participant&)>&& func);

       private:
        std::unique_ptr<OrderbookManager> mOrderbookManager;
        std::unique_ptr<ParticipantManager> mParticipantManager;
    };

} // namespace Sim
