#include "reader.h"

#include <fstream>
#include <sstream>

namespace Sim::Common
{
    std::string FileStringReader::getContents(const std::filesystem::path& filePath) const
    {
        std::ifstream file(filePath);
        std::stringstream buffer;
        buffer << file.rdbuf();

        return buffer.str();
    }

} // namespace Sim::Common
