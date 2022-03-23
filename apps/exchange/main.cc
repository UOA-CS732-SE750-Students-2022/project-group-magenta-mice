#include <common/types.h>
#include <engine/exchange.h>
#include <engine/participant_manager.h>
#include <iostream>

using namespace Sim;

int main() {
  Exchange exchange = Exchange(std::make_unique<ParticipantManager>());
  std::cout << "Hello" << std::endl;
}
