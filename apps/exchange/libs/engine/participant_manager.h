#pragma once

#include "participant.h"
#include <unordered_map>

class ParticipantManager {
 public:
  ParticipantManager() {}

 private:
  std::unordered_map<int, Participant> mParticipants;
};
