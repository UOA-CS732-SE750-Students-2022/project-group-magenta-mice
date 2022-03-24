#include "exchange.h"

namespace Sim {

Exchange::Exchange(
    std::unique_ptr<ParticipantManager> participantManager,
    std::unique_ptr<OrderbookManager> orderbookManager)
    : mOrderbookManager{ std::move(orderbookManager) }, mParticipantManager{ std::move(participantManager) }
{
}

void Exchange::addInstrument(Instrument instrument)
{
    mOrderbookManager->addInstrument(instrument);
}

void Exchange::addParticipant(std::unique_ptr<Participant> participant)
{
    participant->setOrderInsertionHandler(
        [this](std::shared_ptr<Order> owner) { return this->insertOrder(std::move(owner)); });

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

Protocol::LoginResponse Exchange::getExchangeInstruments()
{
    auto res = Protocol::LoginResponse();
    auto instruments = mOrderbookManager->getInstrumentDefinitions();

    for (auto& [id, instrument] : instruments) {
        auto protocolInst = res.add_instruments();
        protocolInst->set_id(id);
        protocolInst->set_ticker(instrument.mName);
        protocolInst->set_positionlimit(instrument.mPositionLimit);
        protocolInst->set_ticksizeincents(instrument.mTickSizeCents);
    }

    return res;
}

} // namespace Sim
