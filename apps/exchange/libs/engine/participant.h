#pragma once

#include "order_factory.h"

#include <boost/asio.hpp>
#include <common/types.h>
#include <config/config.h>
#include <db/connection.h>
#include <memory>
#include <optional>
#include <protocol/exchange.pb.h>
#include <unordered_map>

namespace Sim
{
    class Participant
    {
       public:
        Participant(
            std::unique_ptr<OrderFactory> orderFactory,
            Protocol::LoginResponse loginResponse,
            Db::IConnection& dbConnection,
            const Config::IConfig& config)
            : mOrderFactory{ std::move(orderFactory) }, mConfig{ config }, mDb{ dbConnection } {};

        virtual ~Participant() = default;

        void setId(uint32_t id);
        uint32_t getId() const;

        bool requestOrderInsert(Protocol::InsertOrderRequest& order);
        bool requestOrderCancel(Protocol::CancelOrderRequest& order);

        bool prepareLogout();

        void setOrderInsertionHandler(std::function<bool(OrderOwningPtr)>&& handler);
        void setOrderCancellationHandler(std::function<bool(const Order*)>&& handler);
        void setMessageSender(std::function<void(int, const std::string&)>&& handler);
        void setErrorHandler(std::function<void(const std::string&)>&& handler);

        void handleOrderUpdate(const Order& order, uint32_t volumeRemaining);
        void handleOrderFill(const Order& order, uint32_t volumeFilled, uint32_t price);

        int64_t getCash() const;
        int32_t getPosition(uint32_t forInstrument) const;

        bool isLoggedIn() const;
        void login(std::string userId);

        void diagnose() const;

        void sendMessage(int messageType, const std::string& message);
        void raiseError(const std::string& message);

       private:
        bool checkAndIncrementOrderId(uint32_t id);

        uint32_t mIdentifier;
        std::string mUserId;
        bool mLoggedIn{ false };

        std::unique_ptr<OrderFactory> mOrderFactory;
        uint64_t expectedOrderId = 0;
        std::unordered_map<uint32_t, Order*> mOrders;

        std::optional<std::function<bool(OrderOwningPtr)>> mRequestOrderInsert;
        std::optional<std::function<bool(const Order*)>> mRequestCancelOrder;

        std::optional<std::function<void(int type, const std::string& protobuf)>> mMessageHandler;
        std::optional<std::function<void(const std::string& message)>> mErrorHandler;

        std::unordered_map<uint32_t, int32_t> mPositions;
        int64_t mCash = 0;

        const Config::IConfig& mConfig;
        Db::IConnection& mDb;
    };

} // namespace Sim
