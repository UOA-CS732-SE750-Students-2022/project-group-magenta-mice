#pragma once

#include "orderbook.h"
#include "orderbook_manager.h"
#include "participant_manager.h"

#include <common/types.h>
#include <memory>
#include <protocol/exchange.pb.h>
#include <unordered_map>

namespace Sim
{
    struct IExchange
    {
        virtual ~IExchange() = default;

        virtual void addInstrument(Instrument instrument) = 0;
        virtual void addParticipant(std::shared_ptr<Participant> participant) = 0;
        virtual bool removeParticipant(std::shared_ptr<Participant>) = 0;
        virtual void printBooks() const = 0;
        virtual Protocol::LoginResponse getExchangeInstruments() = 0;
        virtual Protocol::ExchangeFeed getFeed() const = 0;
        virtual const Orderbook& getOrderbook(uint32_t instrument) const = 0;
        virtual void applyToAllParticipants(std::function<void(Participant&)>&& func) = 0;
    };

    class Exchange : public IExchange
    {
       public:
        Exchange(std::unique_ptr<ParticipantManager>, std::unique_ptr<OrderbookManager>);

        void addInstrument(Instrument instrument);
        void addParticipant(std::shared_ptr<Participant> participant);

        bool removeParticipant(std::shared_ptr<Participant>);

        void printBooks() const;

        Protocol::LoginResponse getExchangeInstruments();
        Protocol::ExchangeFeed getFeed() const;

        const Orderbook& getOrderbook(uint32_t instrument) const;

        void applyToAllParticipants(std::function<void(Participant&)>&& func);

       private:
        std::unique_ptr<OrderbookManager> mOrderbookManager;
        std::unique_ptr<ParticipantManager> mParticipantManager;
    };

} // namespace Sim
