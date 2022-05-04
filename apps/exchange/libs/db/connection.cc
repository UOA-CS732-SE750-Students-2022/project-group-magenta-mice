#include "connection.h"

#include <chrono>
#include <iostream>

namespace Sim::Db
{
    Connection::Connection(const std::string& connectionString) : mConnection{ connectionString }
    {
        std::cout << "Connected to " << mConnection.dbname() << '\n';
        mFutureWorkThread = std::thread{ &Connection::executeFutureWork, this };
    }

    pqxx::result Connection::exec(const DbQuery& query)
    {
        std::lock_guard<std::mutex> lock{ mLock };
        pqxx::work W{ mConnection };

        auto result = query(W);
        W.commit();

        return result;
    }

    void Connection::futureExec(DbQuery& query)
    {
        std::lock_guard<std::mutex> lock{ mLock };
        mFutureWork.emplace_back(query);
    }

    void Connection::executeFutureWork()
    {
        using namespace std::chrono_literals;
        for (;;)
        {
            std::this_thread::sleep_for(1ms);

            if (mFutureWork.empty())
            {
                continue;
            }
            std::lock_guard<std::mutex> lock{ mLock };

            auto query = mFutureWork.front();
            mFutureWork.erase(mFutureWork.begin());

            pqxx::work W{ mConnection };
            auto result = query(W);
            W.commit();
        }
    }

} // namespace Sim::Db
