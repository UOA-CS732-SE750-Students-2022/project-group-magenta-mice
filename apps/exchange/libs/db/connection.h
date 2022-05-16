#pragma once

#include <deque>
#include <functional>
#include <mutex>
#include <optional>
#include <pqxx/pqxx>
#include <string>
#include <thread>

namespace Sim::Db
{
    using DbQuery = std::function<pqxx::result(pqxx::work&)>;

    struct IConnection
    {
        virtual ~IConnection() = default;

        virtual pqxx::result exec(const DbQuery& query) = 0;
        virtual void futureExec(DbQuery&& query) = 0;

        virtual std::optional<std::string> checkKey(const std::string& key, const std::string& exchangeId) = 0;
    };

    class Connection : public IConnection
    {
       public:
        Connection(const std::string& connectionString);

        ~Connection() = default;

        pqxx::result exec(const DbQuery& query);
        void futureExec(DbQuery&& query);

        std::optional<std::string> checkKey(const std::string& key, const std::string& exchangeId);

       private:
        pqxx::connection mConnection;
        pqxx::connection mThreadedConnection;

        std::thread mFutureWorkThread;
        std::mutex mLock;
        std::deque<DbQuery> mFutureWork;

        void executeFutureWork();
    };

} // namespace Sim::Db
