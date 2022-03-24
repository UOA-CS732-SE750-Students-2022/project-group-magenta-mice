#include "test_common.h"

#include <common/util.h>
#include <tuple>

namespace Sim::Testing {

TEST(TestingTests, BasicAssertions)
{
    // Expect two strings not to be equal.
    EXPECT_STRNE("hello", "world");
    // Expect equality.
    EXPECT_EQ(7 * 6, 42);

    auto boolAsString = Common::boolToString(true);
    EXPECT_STREQ("true", boolAsString.c_str());
}

class BoolToStringTestFixture
    : public TestWithParam<std::tuple<int, std::string>> {
};

TEST_P(BoolToStringTestFixture, TestBooleanValues)
{
    int booleanCastable = std::get<0>(GetParam());
    std::string expected = std::get<1>(GetParam());

    EXPECT_STREQ(
        expected.c_str(), Common::boolToString(booleanCastable).c_str());
}

INSTANTIATE_TEST_SUITE_P(
    BoolToStringTests,
    BoolToStringTestFixture,
    Values(
        std::make_tuple(0, "false"),
        std::make_tuple(2, "true"),
        std::make_tuple(-1, "true"),
        std::make_tuple(true, "true"),
        std::make_tuple(false, "false")));

} // namespace Sim::Testing
