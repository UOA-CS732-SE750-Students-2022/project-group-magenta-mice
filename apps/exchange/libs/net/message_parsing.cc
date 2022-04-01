#include "message_parsing.h"

#include <protocol/exchange.pb.h>

namespace Sim::Net
{
    MessageParser::MessageParser(IMessageParser& messageParser) {}

    void MessageParser::parseMessage(int32_t messageType, std::string const& message)
    {
        switch (messageType)
        {
        case Protocol::LOGIN: {
            Protocol::LoginRequest loginRequest;
            loginRequest.ParseFromString(message);
            break;
        }
        case Protocol::LOGOUT: {
            Protocol::LogoutRequest logoutRequest;
            logoutRequest.ParseFromString(message);
            break;
        }
        case Protocol::INSERT_ORDER: {
            Protocol::InsertOrderRequest insertOrderRequest;
            insertOrderRequest.ParseFromString(message);
            break;
        }
        case Protocol::CANCEL_ORDER: {
            Protocol::CancelOrderRequest cancelOrderRequest;
            cancelOrderRequest.ParseFromString(message);
            break;
        }
        case Protocol::AMEND_ORDER: {
            throw std::runtime_error("Amend order not implemented");
            // Protocol::AmendOrderRequest amendOrderRequest;
            // amendOrderRequest.ParseFromString(message);
            break;
        }
        default: throw std::runtime_error("Unknown message type");
        }
    }

} // namespace Sim::Net
