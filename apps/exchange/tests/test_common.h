#pragma once

#include <common/reader.h>
#include <config/config.h>
#include <db/connection.h>
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
    using ::testing::ReturnRef;
    using ::testing::Test;
    using ::testing::TestWithParam;
    using ::testing::Values;

    using ::testing::NiceMock;

    struct MockOrderFactory : public OrderFactory
    {
       public:
        MOCK_METHOD(
            OrderOwningPtr,
            createOrder,
            (const Protocol::InsertOrderRequest& request, std::function<void(Order*)> deleter),
            (const override));
    };

    struct MockFileStringReader : public Common::IFileStringReader
    {
        MOCK_METHOD(std::string, getContents, (const std::filesystem::path& filePath), (const));
    };

    struct MockParticipant : Participant
    {
        using Participant::Participant;

        MOCK_METHOD(void, sendMessage, (int messageType, const std::string& message));
    };

    struct MockConnection : public Db::IConnection
    {
        using DbQuery = std::function<pqxx::result(pqxx::work&)>;

        MOCK_METHOD(pqxx::result, exec, (const DbQuery& query));
        MOCK_METHOD(void, futureExec, (DbQuery && query));

        MOCK_METHOD(std::optional<std::string>, checkKey, (const std::string& key, const std::string& exchangeId));
    };

    struct MockConfig : public Config::IConfig
    {
        MOCK_METHOD(uint32_t, getPort, (), (const));
        MOCK_METHOD(const std::vector<Instrument>&, getInstruments, (), (const));
        MOCK_METHOD(const std::string&, getDbString, (), (const));
        MOCK_METHOD(const std::string&, getExchangeId, (), (const));
    };

    struct MockExchange : public IExchange
    {
        MOCK_METHOD(void, addInstrument, (Instrument instrument));
        MOCK_METHOD(void, addParticipant, (std::shared_ptr<Participant> participant));
        MOCK_METHOD(bool, removeParticipant, (std::shared_ptr<Participant>));
        MOCK_METHOD(void, printBooks, (), (const));
        MOCK_METHOD(Protocol::LoginResponse, getExchangeInstruments, ());
        MOCK_METHOD(Protocol::ExchangeFeed, getFeed, (), (const));
        MOCK_METHOD(const Orderbook&, getOrderbook, (uint32_t instrument), (const));
        MOCK_METHOD(void, applyToAllParticipants, (std::function<void(Participant&)> && func));
    };

} // namespace Sim::Testing
