#pragma once

#include <boost/asio.hpp>
#include <functional>

namespace Sim::Common
{
    struct ITimer
    {
        virtual ~ITimer() = default;

        virtual void start(std::function<void()> const& callback) = 0;
        virtual void stop() = 0;
    };

    class SimulantTimer : public ITimer
    {
       public:
        SimulantTimer(int repeatCount);

        void start(std::function<void()> const& callback);
        void stop();

       private:
        int mRepeatCount;
        std::function<void()> mCallback;
    };

    class Timer : ITimer
    {
       public:
        Timer(boost::asio::io_context& io_context, boost::posix_time::millisec interval);

        void start(std::function<void()> const& callback);
        void stop();

       private:
        void tick(const boost::system::error_code&);

        std::optional<std::function<void()>> mCallback;

        boost::posix_time::millisec mInterval;
        boost::asio::deadline_timer mTimer;

        bool mIsRunning = false;
    };
} // namespace Sim::Common
