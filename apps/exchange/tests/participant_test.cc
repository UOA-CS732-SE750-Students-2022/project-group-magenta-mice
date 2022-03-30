#include "test_common.h"

#include <engine/order_factory.h>
#include <engine/participant.h>
#include <protocol/exchange.pb.h>

namespace Sim::Testing
{
    class ParticipantTestFixture : public Test
    {
       protected:
        ParticipantTestFixture() {}

        void setupParticipant(std::function<void(MockOrderFactory&)> applicator)
        {
            auto orderFactory = std::make_unique<MockOrderFactory>();
            applicator(*orderFactory);

            mParticipant = std::make_unique<Participant>(std::move(orderFactory));
        }

        std::unique_ptr<Participant> mParticipant;
    };

    TEST_F(ParticipantTestFixture, TestRequestingInsertCallsFactory)
    {
        setupParticipant([](MockOrderFactory& factory) {
            EXPECT_CALL(factory, createOrder(_, _))
                .WillOnce(Return(std::make_shared<Order>(1, 1, Lifespan::FAK, Side::SELL, 1, 1)));
        });

        bool isHandlerCalled = false;
        std::shared_ptr<Order> placedOrder;

        mParticipant->setOrderInsertionHandler([&isHandlerCalled, &placedOrder](std::shared_ptr<Order> order) {
            isHandlerCalled = true;
            placedOrder = std::move(order);

            return true;
        });

        Protocol::InsertOrderRequest request;

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

        Protocol::InsertOrderRequest request;
        request.set_clientid(1);

        ASSERT_FALSE(mParticipant->requestOrderInsert(request));
    }

    TEST_F(ParticipantTestFixture, TestOrderIdIsIncremented)
    {
        setupParticipant([](MockOrderFactory& factory) {
            EXPECT_CALL(factory, createOrder(_, _))
                .Times(2)
                .WillRepeatedly(Return(std::make_shared<Order>(1, 1, Lifespan::FAK, Side::SELL, 1, 1)));
        });

        int handlerCallCount = 0;

        mParticipant->setOrderInsertionHandler([&handlerCallCount](std::shared_ptr<Order> order) {
            handlerCallCount++;
            return true;
        });

        Protocol::InsertOrderRequest request1;
        request1.set_clientid(0);

        Protocol::InsertOrderRequest request2;
        request2.set_clientid(1);

        Protocol::InsertOrderRequest request3;
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
                .WillOnce(Return(std::make_shared<Order>(1, 1, Lifespan::FAK, Side::SELL, 1, 1)));
        });

        Protocol::InsertOrderRequest request;
        request.set_clientid(0);

        ASSERT_THROW({ mParticipant->requestOrderInsert(request); }, std::runtime_error);
    }

} // namespace Sim::Testing
