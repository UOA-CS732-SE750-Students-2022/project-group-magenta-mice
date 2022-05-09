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

    void Connection::futureExec(DbQuery&& query)
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

            std::unique_lock<std::mutex> lock{ mLock };
            auto copy = mFutureWork;
            mFutureWork.clear();
            lock.unlock();

            while (!copy.empty())
            {
                auto query = copy.front();
                copy.pop_front();

                pqxx::work W{ mConnection };
                auto result = query(W);
                W.commit();
            }
        }
    }

    std::optional<std::string> Connection::checkKey(const std::string& key, const std::string& exchangeId)
    {
        auto result = exec([exchangeId, key](pqxx::work& work) {
            return work.exec_params(
                "SELECT * FROM public.\"UserPermission\" WHERE public.\"UserPermission\".\"apiKey\"=$1 "
                "AND public.\"UserPermission\".\"exchangeId\"=$2",
                key,
                exchangeId);
        });
        if (result.size() == 0)
        {
            return {};
        }
        else
        {
            const auto& userId = result[0]["\"userId\""].as<std::string>();
            return userId;
        }
    }

} // namespace Sim::Db
