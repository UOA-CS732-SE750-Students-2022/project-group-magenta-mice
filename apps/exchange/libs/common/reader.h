#pragma once

#include <filesystem>
#include <string>

namespace Sim::Common
{
    struct IFileStringReader
    {
        virtual ~IFileStringReader() = default;

        virtual std::string getContents(const std::filesystem::path& filePath) const = 0;
    };

    class FileStringReader : public IFileStringReader
    {
       public:
        ~FileStringReader() = default;

        std::string getContents(const std::filesystem::path& filePath) const override;
    };
} // namespace Sim::Common
