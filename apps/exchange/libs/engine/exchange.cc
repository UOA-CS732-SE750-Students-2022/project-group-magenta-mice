#include "exchange.h"

namespace Sim
{
    Exchange::Exchange(
        std::unique_ptr<ParticipantManager> participantManager,
        std::unique_ptr<OrderbookManager> orderbookManager)
        : mOrderbookManager{ std::move(orderbookManager) }, mParticipantManager{ std::move(participantManager) }
    {}

    void Exchange::addInstrument(Instrument instrument) { mOrderbookManager->addInstrument(instrument); }

    void Exchange::addParticipant(std::shared_ptr<Participant> participant)
    {
        participant->setOrderInsertionHandler(
            [this](OrderOwningPtr order) { return this->mOrderbookManager->insertOrder(std::move(order)); });

        participant->setOrderCancellationHandler(
            [this](const Order* order) { return this->mOrderbookManager->cancelOrder(order); });

        mParticipantManager->addParticipant(std::move(participant));
    }

    void Exchange::applyToAllParticipants(std::function<void(Participant&)>&& func)
    {
        mParticipantManager->applyToAll(std::move(func));
    }

    void Exchange::printBooks() const { mOrderbookManager->printBooks(); }

    Protocol::LoginResponse Exchange::getExchangeInstruments()
    {
        auto res = Protocol::LoginResponse();
        const auto& instruments = mOrderbookManager->getInstrumentDefinitions();

        for (const auto& [id, instrument] : instruments)
        {
            auto protocolInst = res.add_instruments();
            protocolInst->set_id(id);
            protocolInst->set_ticker(instrument->mName);
            protocolInst->set_positionlimit(instrument->mPositionLimit);
            protocolInst->set_ticksizeincents(instrument->mTickSizeCents);
        }

        return res;
    }

    Protocol::ExchangeFeed Exchange::getFeed() const { return mOrderbookManager->getFeeds(); }

    const Orderbook& Exchange::getOrderbook(uint32_t instrument) const
    {
        return mOrderbookManager->getOrderbook(instrument);
    }

} // namespace Sim
