#include <chrono>
#include <common/types.h>
#include <engine/exchange.h>
#include <engine/participant_manager.h>
#include <iostream>
#include <random>

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

    Protocol::CancelOrderRequest cancelRequest1;
    cancelRequest1.set_clientid(0);

    using std::chrono::duration;
    using std::chrono::duration_cast;
    using std::chrono::high_resolution_clock;
    using std::chrono::milliseconds;

    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<unsigned long long> dis(20, 240);

    Protocol::InsertOrderRequest insertRequest;
    insertRequest.set_instrumentid(0);
    insertRequest.set_lifespan(Protocol::InsertOrderRequest::GFD);
    insertRequest.set_volume(5);

    auto t1 = high_resolution_clock::now();
    for (int i = 0; i < 10000000; i++)
    {
        insertRequest.set_clientid(i);
        insertRequest.set_price(dis(gen));
        insertRequest.set_side(i % 2 == 0 ? Protocol::InsertOrderRequest::SELL : Protocol::InsertOrderRequest::BUY);
        participant->requestOrderInsert(insertRequest);
    }

    auto t2 = high_resolution_clock::now();
    duration<double, std::milli> ms_double = t2 - t1;
    std::cout << ms_double.count() << "ms\n";

    // exchange.printBooks();

    // participant->requestOrderInsert(bidRequest);
    // exchange.printBooks();

    // participant2->requestOrderInsert(bidRequest2);
    // exchange.printBooks();

    // std::cout << participant->getCash() << std::endl;
    // std::cout << participant->getPosition(0) << std::endl;

    // std::cout << participant2->getCash() << std::endl;
    // std::cout << participant2->getPosition(0) << std::endl;
}
