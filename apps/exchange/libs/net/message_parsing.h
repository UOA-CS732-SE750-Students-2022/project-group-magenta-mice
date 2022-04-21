#pragma once

#include "participant_socket.h"

#include <protocol/exchange.pb.h>
#include <string>

#include <stdint.h>

namespace Sim::Net
{
    struct ISession;

    struct IMessageParser
    {
        virtual ~IMessageParser() = default;

        virtual void parseMessage(int32_t messageType, std::string const& message) = 0;
    };

    class MessageParser : public IMessageParser
    {
       public:
        MessageParser(ISession& participant);

        void parseMessage(int32_t messageType, std::string const& message);

       private:
        ISession& mParticipant;
    };
} // namespace Sim::Net
