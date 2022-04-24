#pragma once

#include <functional>
#include <pqxx/pqxx>
#include <string>

namespace Sim::Db
{
    struct IConnection
    {
        virtual ~IConnection() = default;

        virtual pqxx::result exec(const std::function<pqxx::result(pqxx::work&)>& query) = 0;
    };

    class Connection : public IConnection
    {
       public:
        Connection(const std::string& connectionString);

        ~Connection() = default;

        pqxx::result exec(const std::function<pqxx::result(pqxx::work&)>& query);

       private:
        pqxx::connection mConnection;
    };

} // namespace Sim::Db
