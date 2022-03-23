#pragma once

#include "participant.h"
#include <memory>
#include <unordered_map>

namespace Sim {

class ParticipantManager {
 public:
  ParticipantManager() {}

  void addParticipant(std::unique_ptr<Participant> participant);

 private:
  std::unordered_map<int, std::unique_ptr<Participant>> mParticipants;
};

}  // namespace Sim
