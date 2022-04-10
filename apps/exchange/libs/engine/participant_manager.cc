#include "participant_manager.h"

namespace Sim
{
    void ParticipantManager::addParticipant(std::shared_ptr<Participant> participant)
    {
        auto nextParticipant = mParticipants.size();

        mParticipants.insert(std::make_pair(nextParticipant, std::move(participant)));
    }

    void ParticipantManager::applyToAll(std::function<void(Participant&)>&& func)
    {
        for (auto& participant : mParticipants)
        {
            func(*participant.second);
        }
    }

} // namespace Sim
