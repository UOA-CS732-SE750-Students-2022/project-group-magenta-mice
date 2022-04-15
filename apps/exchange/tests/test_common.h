#pragma once

#include <common/reader.h>
#include <engine/exchange.h>
#include <engine/order_factory.h>
#include <gmock/gmock.h>
#include <gtest/gtest.h>

namespace Sim::Testing
{
    using ::testing::_;
    using ::testing::ByMove;
    using ::testing::Invoke;
    using ::testing::Return;
    using ::testing::Test;
    using ::testing::TestWithParam;
    using ::testing::Values;

    struct MockOrderFactory : public OrderFactory
    {
       public:
        MOCK_METHOD(
            OrderOwningPtr,
            createOrder,
            (const Protocol::InsertOrderRequest& request, std::function<void(Order*)> deleter),
            (const override));
    };

    struct MockSession : public Net::ISession
    {
        MOCK_METHOD(const Protocol::LoginResponse&, getLoginResponse, (), (const));
        MOCK_METHOD(void, sendMessage, (int messageType, std::string const& message));
        MOCK_METHOD(bool, requestOrderInsert, (Protocol::InsertOrderRequest & order));
        MOCK_METHOD(bool, requestOrderCancel, (Protocol::CancelOrderRequest & order));
        MOCK_METHOD(void, raiseError, (std::string errorMessage), (const));
        MOCK_METHOD(bool, isLoggedIn, (), (const));
        MOCK_METHOD(void, login, ());
        MOCK_METHOD(void, logout, ());
    };

    struct MockFileStringReader : public Common::IFileStringReader
    {
        MOCK_METHOD(std::string, getContents, (const std::filesystem::path& filePath), (const));
    };

    struct MockParticipant : Participant
    {
        using Participant::Participant;

        MOCK_METHOD(void, sendMessage, (int messageType, std::string const& message));
    };

} // namespace Sim::Testing
