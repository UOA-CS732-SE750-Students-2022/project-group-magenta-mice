#include "message_parsing.h"

#include <protocol/exchange.pb.h>

namespace Sim::Net
{
    MessageParser::MessageParser(ISession& participant) : mParticipant{ participant } {}

    void MessageParser::parseMessage(int32_t messageType, std::string const& message)
    {
        if (!mParticipant.isLoggedIn())
        {
            switch (messageType)
            {
            case Protocol::LOGIN: {
                Protocol::LoginRequest loginRequest;

                if (!loginRequest.ParseFromString(message))
                {
                    mParticipant.raiseError("Invalid login message type.");
                    return;
                }

                mParticipant.sendMessage(Protocol::LOGIN_RESPONSE, mParticipant.getLoginResponse().SerializeAsString());

                mParticipant.login();

                return;
            }
            default: {
                mParticipant.raiseError("Cannot send message before logging in.");
                return;
            }
            }
        }

        switch (messageType)
        {
        case Protocol::LOGIN: {
            mParticipant.raiseError("Cannot login, already logged in.");
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
            mParticipant.requestOrderInsert(insertOrderRequest);
            break;
        }
        case Protocol::CANCEL_ORDER: {
            Protocol::CancelOrderRequest cancelOrderRequest;
            cancelOrderRequest.ParseFromString(message);
            mParticipant.requestOrderCancel(cancelOrderRequest);
            break;
        }
        case Protocol::AMEND_ORDER: {
            throw std::runtime_error("Amend order not implemented");
            // Protocol::AmendOrderRequest amendOrderRequest;
            // amendOrderRequest.ParseFromString(message);
            break;
        }
        default: {
            mParticipant.raiseError("Invalid message type from client.");
        }
        }
    }

} // namespace Sim::Net
