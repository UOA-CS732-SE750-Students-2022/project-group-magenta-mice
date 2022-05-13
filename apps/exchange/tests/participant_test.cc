#include "test_common.h"

#include <engine/order_factory.h>
#include <engine/participant.h>
#include <protocol/exchange.pb.h>

namespace Sim::Testing
{
    class ParticipantTestFixture : public Test
    {
       protected:
        ParticipantTestFixture()
            : mConnection{ std::make_unique<MockConnection>() }, mConfig{ std::make_unique<MockConfig>() }
        {
            mInstruments.emplace_back(Instrument{
                .mName = "AAPL",
                .mPositionLimit = 100,
                .mTickSizeCents = 1,
                .mId = "abc",
            });
            mInstruments.emplace_back(Instrument{
                .mName = "NVDA",
                .mPositionLimit = 100,
                .mTickSizeCents = 1,
                .mId = "def",
            });
            mInstruments.emplace_back(Instrument{
                .mName = "FFF",
                .mPositionLimit = 100,
                .mTickSizeCents = 2,
                .mId = "ghi",
            });

            ON_CALL(*mConfig, getInstruments()).WillByDefault(ReturnRef(mInstruments));
        }

        void setupParticipant(std::function<void(MockOrderFactory&)> applicator)
        {
            auto orderFactory = std::make_unique<MockOrderFactory>();
            applicator(*orderFactory);

            mParticipant = std::make_unique<MockParticipant>(
                std::move(orderFactory), Protocol::LoginResponse(), *mConnection, *mConfig);
        }

        Protocol::InsertOrderRequest makeRequest()
        {
            Protocol::InsertOrderRequest request;

            request.set_instrumentid(0);
            request.set_clientid(0);
            request.set_price(1);
            request.set_volume(1);
            request.set_lifespan(Protocol::InsertOrderRequest::GFD);
            request.set_side(Protocol::InsertOrderRequest::BUY);

            return request;
        }

        std::vector<Instrument> mInstruments;
        std::unique_ptr<Db::IConnection> mConnection;
        std::unique_ptr<MockConfig> mConfig;
        std::unique_ptr<MockParticipant> mParticipant;
    };

    TEST_F(ParticipantTestFixture, TestRequestingInsertCallsFactory)
    {
        setupParticipant([](MockOrderFactory& factory) {
            EXPECT_CALL(factory, createOrder(_, _))
                .WillOnce(Return(ByMove(std::make_unique<Order>(1, 1, Lifespan::FAK, Side::SELL, 1, 1))));
        });

        bool isHandlerCalled = false;
        OrderOwningPtr placedOrder;

        mParticipant->setOrderInsertionHandler([&isHandlerCalled, &placedOrder](OrderOwningPtr order) {
            isHandlerCalled = true;
            placedOrder = std::move(order);

            return true;
        });

        Protocol::InsertOrderRequest request = makeRequest();

        mParticipant->requestOrderInsert(request);

        ASSERT_TRUE(isHandlerCalled);

        ASSERT_EQ(placedOrder->mClientId, 1);
        ASSERT_EQ(placedOrder->mVolume, 1);
        ASSERT_EQ(placedOrder->mLifespan, Lifespan::FAK);
        ASSERT_EQ(placedOrder->mSide, Side::SELL);
        ASSERT_EQ(placedOrder->mPrice, 1);
        ASSERT_EQ(placedOrder->mVolume, 1);
    }

    TEST_F(ParticipantTestFixture, TestIncorrectOrderIdIsRejected)
    {
        setupParticipant([](MockOrderFactory& factory) { EXPECT_CALL(factory, createOrder(_, _)).Times(0); });

        Protocol::InsertOrderRequest request = makeRequest();
        request.set_clientid(1);

        ASSERT_FALSE(mParticipant->requestOrderInsert(request));
    }

    TEST_F(ParticipantTestFixture, TestOrderIdIsIncremented)
    {
        setupParticipant([](MockOrderFactory& factory) {
            EXPECT_CALL(factory, createOrder(_, _)).Times(2).WillRepeatedly(Invoke([]() {
                return std::make_unique<Order>(1, 1, Lifespan::FAK, Side::SELL, 1, 1);
            }));
        });

        int handlerCallCount = 0;

        mParticipant->setOrderInsertionHandler([&handlerCallCount](OrderOwningPtr order) {
            handlerCallCount++;
            return true;
        });

        Protocol::InsertOrderRequest request1 = makeRequest();
        request1.set_clientid(0);

        Protocol::InsertOrderRequest request2 = makeRequest();
        request2.set_clientid(1);

        Protocol::InsertOrderRequest request3 = makeRequest();
        request3.set_clientid(1);

        ASSERT_TRUE(mParticipant->requestOrderInsert(request1));
        ASSERT_TRUE(mParticipant->requestOrderInsert(request2));
        ASSERT_FALSE(mParticipant->requestOrderInsert(request3));

        ASSERT_EQ(handlerCallCount, 2);
    }

    TEST_F(ParticipantTestFixture, MissingOrderHandlerWillThrow)
    {
        setupParticipant([](MockOrderFactory& factory) {
            EXPECT_CALL(factory, createOrder(_, _))
                .Times(1)
                .WillOnce(Return(ByMove(std::make_unique<Order>(1, 1, Lifespan::FAK, Side::SELL, 1, 1))));
        });

        Protocol::InsertOrderRequest request = makeRequest();
        request.set_clientid(0);

        ASSERT_THROW({ mParticipant->requestOrderInsert(request); }, std::runtime_error);
    }

    TEST_F(ParticipantTestFixture, PositionsAndCashUpdated)
    {
        auto order = std::make_unique<Order>(0, 1, Lifespan::FAK, Side::SELL, 0, 0);
        auto orderPtr = order.get();

        setupParticipant([&order](MockOrderFactory& factory) {
            EXPECT_CALL(factory, createOrder(_, _)).Times(1).WillOnce(Return(ByMove(std::move(order))));
        });

        EXPECT_CALL(*mParticipant, sendMessage(_, _)).Times(1);

        // keep this in memory
        OrderOwningPtr placedOrder;

        mParticipant->setOrderInsertionHandler([&placedOrder](OrderOwningPtr order) {
            placedOrder = std::move(order);
            return true;
        });

        Protocol::InsertOrderRequest request = makeRequest();
        mParticipant->requestOrderInsert(request);

        orderPtr->mOrderListener->onFill(*orderPtr, 10, 10);

        ASSERT_EQ(mParticipant->getCash(), 100);
        ASSERT_EQ(mParticipant->getPosition(1), -10);
    }

    TEST_F(ParticipantTestFixture, OrderCancellingCancelsOrder)
    {
        auto order = std::make_unique<Order>(0, 1, Lifespan::FAK, Side::SELL, 5, 5);
        auto orderPtr = order.get();

        setupParticipant([&order](MockOrderFactory& factory) {
            EXPECT_CALL(factory, createOrder(_, _)).Times(1).WillOnce(Return(ByMove(std::move(order))));
        });

        bool isCancelCalled = false;
        const Order* orderToCancel = nullptr;

        mParticipant->setOrderInsertionHandler([](OrderOwningPtr order) { return true; });
        mParticipant->setOrderCancellationHandler([&isCancelCalled, &orderToCancel](const Order* order) {
            isCancelCalled = true;
            orderToCancel = std::move(order);
            return true;
        });

        Protocol::InsertOrderRequest request = makeRequest();
        mParticipant->requestOrderInsert(request);

        Protocol::CancelOrderRequest cancelRequest;
        cancelRequest.set_clientid(0);

        mParticipant->requestOrderCancel(cancelRequest);

        ASSERT_TRUE(isCancelCalled);
        ASSERT_EQ(orderToCancel, orderPtr);
    }

    TEST_F(ParticipantTestFixture, RuntimeErrorWhenCancelHandlerNotSet)
    {
        setupParticipant([](MockOrderFactory& factory) {});

        Protocol::CancelOrderRequest cancelRequest;
        cancelRequest.set_clientid(0);

        ASSERT_THROW({ mParticipant->requestOrderCancel(cancelRequest); }, std::runtime_error);
    }

    TEST_F(ParticipantTestFixture, NoCancelIfNonExistantOrderIsCancelled)
    {
        setupParticipant([](MockOrderFactory& factory) {});

        Protocol::CancelOrderRequest cancelRequest;
        cancelRequest.set_clientid(0);

        bool isCancelCalled = false;
        const Order* orderToCancel = nullptr;

        mParticipant->setOrderCancellationHandler([&isCancelCalled, &orderToCancel](const Order* order) {
            isCancelCalled = true;
            orderToCancel = std::move(order);
            return true;
        });

        ASSERT_FALSE(mParticipant->requestOrderCancel(cancelRequest));

        ASSERT_FALSE(isCancelCalled);
        ASSERT_EQ(orderToCancel, nullptr);
    }

    TEST_F(ParticipantTestFixture, VolumeOfZeroRejected)
    {
        setupParticipant([](MockOrderFactory& factory) {});

        int callCount = 0;
        mParticipant->setErrorHandler([&callCount](const std::string& messsage) { callCount++; });

        Protocol::InsertOrderRequest request = makeRequest();
        request.set_clientid(0);
        request.set_volume(0);
        ASSERT_FALSE(mParticipant->requestOrderInsert(request));

        ASSERT_EQ(callCount, 1);
    }

    TEST_F(ParticipantTestFixture, OffTickPriceRejected)
    {
        setupParticipant([](MockOrderFactory& factory) {});

        int callCount = 0;
        mParticipant->setErrorHandler([&callCount](const std::string& messsage) { callCount++; });

        Protocol::InsertOrderRequest request = makeRequest();
        request.set_price(1);
        request.set_instrumentid(2);
        ASSERT_FALSE(mParticipant->requestOrderInsert(request));

        ASSERT_EQ(callCount, 1);
    }

    TEST_F(ParticipantTestFixture, ExceedingPositionLimitKicksFromExchange)
    {
        setupParticipant([](MockOrderFactory& factory) {});

        int callCount = 0;
        mParticipant->setErrorHandler([&callCount](const std::string& messsage) { callCount++; });

        Order order{ 0, 1, Lifespan::FAK, Side::SELL, 1, 101 };

        // ok
        mParticipant->handleOrderFill(order, 100, 1);

        // bad
        mParticipant->handleOrderFill(order, 1, 1);

        EXPECT_EQ(callCount, 1);
    }

} // namespace Sim::Testing
