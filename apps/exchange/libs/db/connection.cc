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
        try
        {
            pqxx::work W{ mConnection };

            auto result = query(W);
            W.commit();
            return result;
        }
        catch (const pqxx::data_exception& e)
        {
            std::cerr << e.what() << std::endl;
            const pqxx::sql_error* s = dynamic_cast<const pqxx::sql_error*>(&e);
            if (s)
                std::cerr << "Query was: " << s->query() << std::endl;
            throw e;
        }
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
                try
                {
                    pqxx::work W{ mConnection };
                    auto result = query(W);
                    W.commit();
                }
                catch (const pqxx::data_exception& e)
                {
                    std::cerr << e.what() << std::endl;
                    const pqxx::sql_error* s = dynamic_cast<const pqxx::sql_error*>(&e);
                    if (s)
                        std::cerr << "Query was: " << s->query() << std::endl;
                }
            }
        }
    } // namespace Sim::Db

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
