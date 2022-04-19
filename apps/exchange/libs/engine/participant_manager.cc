#include "participant_manager.h"

namespace Sim
{
    void ParticipantManager::addParticipant(std::shared_ptr<Participant> participant)
    {
        auto nextParticipant = mParticipants.size();

        participant->setId(nextParticipant);
        mParticipants.insert(std::make_pair(nextParticipant, std::move(participant)));
    }

    bool ParticipantManager::removeParticipant(std::shared_ptr<Participant> participant)
    {
        auto it = mParticipants.find(participant->getId());

        if (it != mParticipants.end())
        {
            it->second->prepareLogout();

            mParticipants.erase(it);
            return true;
        }
        return false;
    }

    void ParticipantManager::applyToAll(std::function<void(Participant&)>&& func)
    {
        for (auto& participant : mParticipants)
        {
            func(*participant.second);
        }
    }

} // namespace Sim
