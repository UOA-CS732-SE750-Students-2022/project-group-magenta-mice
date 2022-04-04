#include "timer.h"

#include <iostream>

namespace Sim::Common
{
    Timer::Timer(boost::asio::io_context& io_context, boost::posix_time::millisec interval)
        : mInterval{ interval }, mTimer{ io_context, interval }
    {}

    void Timer::start(std::function<void()> const& callback)
    {
        mIsRunning = true;
        mCallback = callback;
        mTimer.async_wait([this](const boost::system::error_code& error) { tick(error); });
    }

    void Timer::stop()
    {
        mTimer.cancel();
        mIsRunning = false;
    }

    void Timer::tick(const boost::system::error_code&)
    {
        if (!mIsRunning)
        {
            return;
        }
        if (mCallback.has_value())
        {
            (*mCallback)();
        }
        mTimer.expires_at(mTimer.expires_at() + mInterval);
        // Posts the timer event
        mTimer.async_wait([this](const boost::system::error_code& error) { tick(error); });
    }

    SimulantTimer::SimulantTimer(int repeatCount) : mRepeatCount{ repeatCount } {}

    void SimulantTimer::start(std::function<void()> const& callback)
    {
        mCallback = callback;
        for (int i = 0; i < mRepeatCount; ++i)
        {
            mCallback();
        }
    }

    void SimulantTimer::stop() { std::cout << "SimulantTimer::stop() is a nullop" << std::endl; }

} // namespace Sim::Common
