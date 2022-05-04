#pragma once

#include "participant_socket.h"

#include <functional>
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

        virtual std::optional<std::string> checkLogin(const std::string& key) const = 0;
    };

    class MessageParser : public IMessageParser
    {
       public:
        MessageParser(ISession& participant, std::function<std::optional<std::string>(const std::string&)> loginCheck);

        void parseMessage(int32_t messageType, std::string const& message);

        std::optional<std::string> checkLogin(const std::string& key) const;

       private:
        ISession& mParticipant;
        std::function<std::optional<std::string>(const std::string&)> mLoginCheck;
    };
} // namespace Sim::Net
