#include "orderbook_manager.h"

namespace Sim
{
    void OrderbookManager::addInstrument(Instrument instrument)
    {
        auto nextInstrument = size();

        mInstruments.insert(std::make_pair(nextInstrument, instrument));
        mOrderbooks.insert(std::make_pair(nextInstrument, Orderbook()));
    }

    std::vector<std::tuple<uint32_t, const Instrument&>> OrderbookManager::getInstrumentDefinitions() const
    {
        std::vector<std::tuple<uint32_t, const Instrument&>> res;

        for (auto& instrument : mInstruments)
        {
            res.push_back(std::make_tuple(instrument.first, instrument.second));
        }

        return res;
    }

    bool OrderbookManager::insertOrder(std::shared_ptr<Order> order)
    {
        auto orderbook = mOrderbooks.find(order->mInstrument);

        if (orderbook == mOrderbooks.end())
        {
            return false;
        }

        return orderbook->second.insertOrder(std::move(order));
    }

    size_t OrderbookManager::size() const { return mOrderbooks.size(); }

    void OrderbookManager::printBooks() const
    {
        for (auto& [instrument, book] : mOrderbooks)
        {
            std::cout << "--- " << instrument << " ---" << std::endl;
            std::cout << book << std::endl;
            std::cout << std::endl;
        }
    }

} // namespace Sim
