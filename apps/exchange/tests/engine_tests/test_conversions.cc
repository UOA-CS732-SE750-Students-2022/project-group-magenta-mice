#include <common/types.h>
#include <engine/conversions.h>
#include <gtest/gtest.h>
#include <protocol/exchange.pb.h>
#include <tuple>

namespace Sim::Testing {

class SideConversionTestFixture
    : public ::testing::TestWithParam<
          std::tuple<Protocol::InsertOrderRequest::Side, Side>> {
};

TEST_P(SideConversionTestFixture, TestSideConversion)
{
    auto side = std::get<0>(GetParam());
    auto expected = std::get<0>(GetParam());

    EXPECT_EQ(side, expected);
}

INSTANTIATE_TEST_SUITE_P(
    TestSideConversion,
    SideConversionTestFixture,
    ::testing::Values(
        std::make_tuple(Protocol::InsertOrderRequest::BUY, Side::BUY),
        std::make_tuple(Protocol::InsertOrderRequest::SELL, Side::SELL)));

class LifespanConversionTestFixture
    : public ::testing::TestWithParam<
          std::tuple<Protocol::InsertOrderRequest::Lifespan, Lifespan>> {
};

TEST_P(LifespanConversionTestFixture, TestLifespanConversion)
{
    auto lifespan = std::get<0>(GetParam());
    auto expected = std::get<0>(GetParam());

    EXPECT_EQ(lifespan, expected);
}

INSTANTIATE_TEST_SUITE_P(
    TestLifespanConversion,
    LifespanConversionTestFixture,
    ::testing::Values(
        std::make_tuple(Protocol::InsertOrderRequest::GFD, Lifespan::GFD),
        std::make_tuple(Protocol::InsertOrderRequest::FAK, Lifespan::FAK)));

} // namespace Sim::Testing
