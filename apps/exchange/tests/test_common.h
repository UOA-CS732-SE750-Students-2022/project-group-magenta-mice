#pragma once

#include <engine/exchange.h>
#include <engine/order_factory.h>
#include <gmock/gmock.h>
#include <gtest/gtest.h>

namespace Sim::Testing
{
    using ::testing::_;
    using ::testing::Return;
    using ::testing::Test;
    using ::testing::TestWithParam;
    using ::testing::Values;

    struct MockOrderFactory : public OrderFactory
    {
       public:
        MOCK_METHOD(
            std::shared_ptr<Order>,
            createOrder,
            (const Protocol::InsertOrderRequest& request, std::function<void(Order*)> deleter),
            (const override));
    };

} // namespace Sim::Testing
