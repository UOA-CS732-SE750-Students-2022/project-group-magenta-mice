#include "exchange.h"

namespace Sim {

Exchange::Exchange(std::unique_ptr<ParticipantManager> participant_manager)
    : mParticipantManager(std::move(participant_manager)) {}

void Exchange::addInstrument(Instrument instrument) {
  auto nextInstrument = mInstruments.size();

  mInstruments.insert(std::make_pair(nextInstrument, instrument));
  mOrderbooks.insert(std::make_pair(nextInstrument, Orderbook()));
}

void Exchange::addParticipant(std::unique_ptr<Participant> participant) {
  participant->setOrderInsertionHandler([this](OrderOwningPtr owner) {
    return this->insertOrder(std::move(owner));
  });

  mParticipantManager->addParticipant(std::move(participant));
}

bool Exchange::insertOrder(OrderOwningPtr order) { return true; }

}  // namespace Sim
