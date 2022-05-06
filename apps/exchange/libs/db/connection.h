#pragma once

#include <deque>
#include <functional>
#include <mutex>
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
    };

    class Connection : public IConnection
    {
       public:
        Connection(const std::string& connectionString);

        ~Connection() = default;

        pqxx::result exec(const DbQuery& query);
        void futureExec(DbQuery&& query);

       private:
        pqxx::connection mConnection;

        std::thread mFutureWorkThread;
        std::mutex mLock;
        std::deque<DbQuery> mFutureWork;

        void executeFutureWork();
    };

} // namespace Sim::Db
