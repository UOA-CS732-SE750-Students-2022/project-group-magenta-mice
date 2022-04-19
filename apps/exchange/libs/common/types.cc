#include "types.h"

namespace Sim
{
    bool Instrument::operator==(const Instrument& rhs) const
    {
        return mName == rhs.mName && mPositionLimit == rhs.mPositionLimit && mTickSizeCents == rhs.mTickSizeCents;
    }
} // namespace Sim
