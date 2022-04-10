#pragma once

#include "participant.h"

#include <memory>
#include <unordered_map>

namespace Sim
{
    class ParticipantManager
    {
       public:
        ParticipantManager() {}

        void addParticipant(std::shared_ptr<Participant> participant);

        void applyToAll(std::function<void(Participant&)>&& func);

       private:
        std::unordered_map<int, std::shared_ptr<Participant>> mParticipants;
    };

} // namespace Sim
