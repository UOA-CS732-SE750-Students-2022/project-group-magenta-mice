// #include "test_common.h"

// namespace Sim::Testing
// {
//     using Net::ISession;
//     using Net::MessageParser;

//     class MessageParsingTestFixture : public Test
//     {
//        protected:
//         MessageParsingTestFixture()
//             : mSession{ MockSession() }, mParser{ mSession, [](const std::string&) { return "someId"; } }
//         {}

//         MockSession mSession;
//         MessageParser mParser;
//     };

//     TEST_F(MessageParsingTestFixture, TestMessageWhileNotLoggedInFails)
//     {
//         EXPECT_CALL(mSession, isLoggedIn()).Times(7).WillRepeatedly(Return(false));
//         EXPECT_CALL(mSession, raiseError(_)).Times(7);

//         mParser.parseMessage(Protocol::INSERT_ORDER, "");
//         mParser.parseMessage(Protocol::AMEND_ORDER, "");
//         mParser.parseMessage(Protocol::CANCEL_ORDER, "");
//         mParser.parseMessage(Protocol::LOGOUT, "");
//         mParser.parseMessage(Protocol::LOGOUT_RESPONSE, "");
//         mParser.parseMessage(Protocol::EXCHANGE_FEED, "");
//         mParser.parseMessage(Protocol::LOGIN_RESPONSE, "");
//     }

//     TEST_F(MessageParsingTestFixture, TestLoginMessageCallsLogin)
//     {
//         EXPECT_CALL(mSession, isLoggedIn()).Times(1).WillOnce(Return(false));
//         EXPECT_CALL(mSession, sendMessage(_, _)).Times(1);
//         EXPECT_CALL(mSession, login(_)).Times(1);

//         Protocol::LoginResponse res;
//         EXPECT_CALL(mSession, getLoginResponse()).Times(1).WillOnce(ReturnRef(res));

//         Protocol::LoginRequest req;
//         req.set_key("abc");

//         mParser.parseMessage(Protocol::LOGIN, req.SerializeAsString());
//     }

//     TEST_F(MessageParsingTestFixture, TestErrorRaisedWhenLoggingInIfAlreadyLoggedIn)
//     {
//         EXPECT_CALL(mSession, isLoggedIn()).Times(1).WillOnce(Return(true));
//         EXPECT_CALL(mSession, raiseError(_)).Times(1);

//         Protocol::LoginRequest req;
//         req.set_key("abc");

//         mParser.parseMessage(Protocol::LOGIN, req.SerializeAsString());
//     }

//     TEST_F(MessageParsingTestFixture, TestRandomMessageTypeWhileLoggedInRaisesError)
//     {
//         EXPECT_CALL(mSession, isLoggedIn()).Times(1).WillOnce(Return(true));
//         EXPECT_CALL(mSession, raiseError(_)).Times(1);

//         int32_t unusedMessageNumber = -1;

//         mParser.parseMessage(unusedMessageNumber, "");
//     }
// } // namespace Sim::Testing
