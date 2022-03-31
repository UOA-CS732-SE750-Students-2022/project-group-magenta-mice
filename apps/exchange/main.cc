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

    auto participant2 = std::make_shared<Participant>(std::make_unique<OrderFactory>());
    exchange.addParticipant(participant2);

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

    Protocol::InsertOrderRequest bidRequest2;
    bidRequest2.set_clientid(0);
    bidRequest2.set_instrumentid(0);
    bidRequest2.set_lifespan(Protocol::InsertOrderRequest::GFD);
    bidRequest2.set_side(Protocol::InsertOrderRequest::BUY);
    bidRequest2.set_price(100);
    bidRequest2.set_volume(6);

    participant->requestOrderInsert(askRequest);
    exchange.printBooks();

    participant->requestOrderInsert(bidRequest);
    exchange.printBooks();

    participant2->requestOrderInsert(bidRequest2);
    exchange.printBooks();

    std::cout << participant->getCash() << std::endl;
    std::cout << participant->getPosition(0) << std::endl;

    std::cout << participant2->getCash() << std::endl;
    std::cout << participant2->getPosition(0) << std::endl;
}
