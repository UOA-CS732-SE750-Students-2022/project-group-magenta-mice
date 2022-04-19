#include "connection.h"

#include <iostream>

namespace Sim::Db
{
    Connection::Connection(const std::string& connectionString) : mConnection{ connectionString }
    {
        std::cout << "Connected to " << mConnection.dbname() << '\n';
    }

    pqxx::result Connection::exec(const std::function<pqxx::result(pqxx::work&)>& query)
    {
        pqxx::work W{ mConnection };

        auto result = query(W);
        W.commit();

        return result;
    }

} // namespace Sim::Db
