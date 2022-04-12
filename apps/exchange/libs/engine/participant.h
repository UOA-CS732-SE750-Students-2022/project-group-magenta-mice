#pragma once

#include "order_factory.h"

#include <boost/asio.hpp>
#include <common/types.h>
#include <memory>
#include <net/participant_socket.h>
#include <optional>
#include <protocol/exchange.pb.h>
#include <unordered_map>

namespace Sim
{
    namespace io = boost::asio;

    class Participant : public Net::ParticipantSession
    {
        using tcp = io::ip::tcp;

       public:
        Participant(
            std::unique_ptr<OrderFactory> orderFactory,
            std::optional<tcp::socket>&& socket,
            Protocol::LoginResponse loginResponse)
            : Net::ParticipantSession(std::move(socket), loginResponse), mOrderFactory{ std::move(orderFactory) } {};

        bool requestOrderInsert(Protocol::InsertOrderRequest& order);
        bool requestOrderCancel(Protocol::CancelOrderRequest& order);

        void sendError(std::string&& error);

        void setOrderInsertionHandler(std::function<bool(OrderOwningPtr)>&& handler);
        void setOrderCancellationHandler(std::function<bool(const Order*)>&& handler);

        void handleOrderUpdate(const Order& order, uint32_t volumeRemaining);
        void handleOrderFill(const Order& order, uint32_t volumeFilled, uint32_t price);

        int64_t getCash() const;
        int32_t getPosition(uint32_t forInstrument) const;

       private:
        bool checkAndIncrementOrderId(uint32_t id);

        std::unique_ptr<OrderFactory> mOrderFactory;

        uint64_t expectedOrderId = 0;

        std::unordered_map<uint32_t, Order*> mOrders;

        std::optional<std::function<bool(OrderOwningPtr)>> mRequestOrderInsert;
        std::optional<std::function<bool(const Order*)>> mRequestCancelOrder;

        std::unordered_map<uint32_t, int32_t> mPositions;
        int64_t mCash = 0;
    };

} // namespace Sim
