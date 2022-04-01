#pragma once

#include <string>

#include <stdint.h>

namespace Sim::Net
{
    struct IMessageParser
    {
        virtual ~IMessageParser() = default;

        virtual void parseMessage(int32_t messageType, std::string const& message) = 0;
    };

    class MessageParser
    {
       public:
        MessageParser(IMessageParser& messageParser);

        void parseMessage(int32_t messageType, std::string const& message);
    };
} // namespace Sim::Net
