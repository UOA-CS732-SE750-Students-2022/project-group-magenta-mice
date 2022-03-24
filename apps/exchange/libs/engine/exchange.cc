#include "exchange.h"

namespace Sim {

Exchange::Exchange(
    std::unique_ptr<ParticipantManager> participantManager,
    std::unique_ptr<OrderbookManager> orderbookManager)
    : mOrderbookManager{ std::move(orderbookManager) },
      mParticipantManager{ std::move(participantManager) }
{
}

void Exchange::addInstrument(Instrument instrument)
{
    mOrderbookManager->addInstrument(instrument);
}

void Exchange::addParticipant(std::unique_ptr<Participant> participant)
{
    participant->setOrderInsertionHandler([this](std::shared_ptr<Order> owner) {
        return this->insertOrder(std::move(owner));
    });

    mParticipantManager->addParticipant(std::move(participant));
}

bool Exchange::insertOrder(std::shared_ptr<Order> order)
{
    return true;
}

void Exchange::printBooks()
{
    mOrderbookManager->printBooks();
}

} // namespace Sim
