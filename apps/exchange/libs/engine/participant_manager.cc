#include "participant_manager.h"

namespace Sim
{
    void ParticipantManager::addParticipant(std::shared_ptr<Participant> participant)
    {
        auto nextParticipant = mParticipants.size();

        mParticipants.insert(std::make_pair(nextParticipant, std::move(participant)));
    }

} // namespace Sim
