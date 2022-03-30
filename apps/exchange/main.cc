#include <common/types.h>
#include <engine/exchange.h>
#include <engine/participant_manager.h>
#include <iostream>

using namespace Sim;

int main()
{
    Exchange exchange = Exchange(std::make_unique<ParticipantManager>(), std::make_unique<OrderbookManager>());

    auto instr = Instrument{
        .mName = "AAPL",
        .mPositionLimit = 100,
        .mTickSizeCents = 1,
    };

    exchange.addInstrument(instr);

    auto participant = std::make_shared<Participant>(std::make_unique<OrderFactory>());
    exchange.addParticipant(participant);

    Protocol::InsertOrderRequest askRequest;
    askRequest.set_clientid(0);
    askRequest.set_instrumentid(0);
    askRequest.set_lifespan(Protocol::InsertOrderRequest::GFD);
    askRequest.set_side(Protocol::InsertOrderRequest::SELL);
    askRequest.set_price(100);
    askRequest.set_volume(5);

    Protocol::InsertOrderRequest bidRequest;
    bidRequest.set_clientid(1);
    bidRequest.set_instrumentid(0);
    bidRequest.set_lifespan(Protocol::InsertOrderRequest::GFD);
    bidRequest.set_side(Protocol::InsertOrderRequest::BUY);
    bidRequest.set_price(99);
    bidRequest.set_volume(8);

    participant->requestOrderInsert(askRequest);
    participant->requestOrderInsert(bidRequest);

    exchange.printBooks();
}
