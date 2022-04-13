#include "orderbook_manager.h"

namespace Sim
{
    void OrderbookManager::addInstrument(Instrument instrument)
    {
        auto nextInstrument = size();

        mInstruments.insert(std::make_pair(nextInstrument, instrument));
        mOrderbooks.insert(std::make_pair(nextInstrument, Orderbook()));
    }

    std::vector<std::pair<uint32_t, const Instrument*>> OrderbookManager::getInstrumentDefinitions() const
    {
        std::vector<std::pair<uint32_t, const Instrument*>> res;

        for (auto& instrument : mInstruments)
        {
            res.push_back(std::make_pair(instrument.first, &instrument.second));
        }

        return res;
    }

    Protocol::ExchangeFeed OrderbookManager::getFeeds() const
    {
        Protocol::ExchangeFeed feed;

        for (auto& [id, orderbook] : mOrderbooks)
        {
            const auto& newFeed = feed.add_instrumentfeeds();

            newFeed->set_instrumentid(id);

            for (auto& [price, volume] : orderbook.getTopAskLevels(5))
            {
                const auto& newAsks = newFeed->add_asks();

                newAsks->set_price(price);
                newAsks->set_price(volume);
            }

            for (auto& [price, volume] : orderbook.getTopBidLevels(5))
            {
                const auto& newBids = newFeed->add_bids();

                newBids->set_price(price);
                newBids->set_price(volume);
            }
        }

        return feed;
    }

    bool OrderbookManager::insertOrder(OrderOwningPtr order)
    {
        auto orderbook = mOrderbooks.find(order->mInstrument);

        if (orderbook == mOrderbooks.end())
        {
            return false;
        }

        return orderbook->second.insertOrder(std::move(order));
    }

    bool OrderbookManager::cancelOrder(const Order* order)
    {
        auto orderbook = mOrderbooks.find(order->mInstrument);

        if (orderbook == mOrderbooks.end())
        {
            return false;
        }

        return orderbook->second.cancelOrder(order);
    }

    size_t OrderbookManager::size() const { return mOrderbooks.size(); }

    const Orderbook& OrderbookManager::getOrderbook(uint32_t instrument) const
    {
        auto orderbook = mOrderbooks.find(instrument);

        if (orderbook == mOrderbooks.end())
        {
            throw std::runtime_error("OrderbookManager::getOrderbook: instrument not found");
        }

        return orderbook->second;
    }

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
