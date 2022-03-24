#include "orderbook_manager.h"

namespace Sim {

void OrderbookManager::addInstrument(Instrument instrument)
{
    auto nextInstrument = size();

    mInstruments.insert(std::make_pair(nextInstrument, instrument));
    mOrderbooks.insert(std::make_pair(nextInstrument, Orderbook()));
}

std::vector<std::tuple<uint32_t, const Instrument &>> OrderbookManager::getInstrumentDefinitions() const
{
    std::vector<std::tuple<uint32_t, const Instrument &>> res;

    for (auto &instrument : mInstruments) {
        res.push_back(std::make_tuple(instrument.first, instrument.second));
    }

    return res;
}

size_t OrderbookManager::size() const
{
    return mOrderbooks.size();
}

void OrderbookManager::printBooks() const
{
    for (auto &kv : mOrderbooks) {
        std::cout << "Hi" << std::endl;
    }
}

} // namespace Sim
