#pragma once

#include <iostream>

namespace Sim::Common
{
    template <class CharT, class Traits>
    constexpr std::basic_ostream<CharT, Traits>& RESET(std::basic_ostream<CharT, Traits>& os)
    {
        return os << "\033[0m";
    }

    template <class CharT, class Traits>
    constexpr std::basic_ostream<CharT, Traits>& BLACK(std::basic_ostream<CharT, Traits>& os)
    {
        return os << "\033[30m";
    }

    template <class CharT, class Traits>
    constexpr std::basic_ostream<CharT, Traits>& RED(std::basic_ostream<CharT, Traits>& os)
    {
        return os << "\033[31m";
    }
} // namespace Sim::Common
