#pragma once

#include <string>

#include <stdint.h>

namespace Sim::Net
{
    class IMessageParser
    {
        virtual ~IMessageParser() = default;

        virtual void parseMessage(int32_t messageType, std::string const& message) = 0;
    };

    class MessageParser
    {
    };
} // namespace Sim::Net
