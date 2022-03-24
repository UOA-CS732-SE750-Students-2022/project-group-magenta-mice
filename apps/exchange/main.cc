#include <common/types.h>
#include <engine/exchange.h>
#include <engine/participant_manager.h>
#include <iostream>

using namespace Sim;

int main()
{
    Exchange exchange = Exchange(
        std::make_unique<ParticipantManager>(),
        std::make_unique<OrderbookManager>());

    auto instr = Instrument{
        .mName = "AAPL",
        .mPositionLimit = 100,
        .mTickSizeCents = 1,
    };

    exchange.addInstrument(instr);

    exchange.printBooks();
}
