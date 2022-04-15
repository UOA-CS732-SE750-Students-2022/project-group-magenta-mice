#pragma once

#include "config.h"

#include <filesystem>

namespace Sim::Config
{
    struct IConfigReader
    {
        virtual ~IConfigReader() = default;

        virtual Config Read(char* relativeConfigFilePath) = 0;
        virtual bool Validate(int argc, char* argv[]) const = 0;
    };

    class ConfigReader : IConfigReader
    {
       public:
        ~ConfigReader() override = default;

        Config Read(char* relativeConfigFilePath) override;
        bool Validate(int argc, char* argv[]) const override;

       private:
        std::filesystem::path getPathFromRelative(char* relativeConfigFilePath) const;
    };
} // namespace Sim::Config
