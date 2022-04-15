#pragma once

#include "config.h"

#include <common/reader.h>
#include <filesystem>

namespace Sim::Config
{
    struct IConfigReader
    {
        virtual ~IConfigReader() = default;

        virtual ExchangeConfig read(const char* relativeConfigFilePath) = 0;
        virtual bool validate(int argc, char* argv[]) const = 0;
    };

    class ConfigReader : public IConfigReader
    {
       public:
        ConfigReader(Common::IFileStringReader& fileStringReader);
        ~ConfigReader() override = default;

        ExchangeConfig read(const char* relativeConfigFilePath) override;
        bool validate(int argc, char* argv[]) const override;

       private:
        std::filesystem::path getPathFromRelative(const char* relativeConfigFilePath) const;
        Common::IFileStringReader& mFileStringReader;
    };
} // namespace Sim::Config
