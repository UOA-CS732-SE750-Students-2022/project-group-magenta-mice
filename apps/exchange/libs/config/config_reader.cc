#include "config_reader.h"

#include <fstream>
#include <iostream>
#include <rapidjson/document.h>
#include <rapidjson/stringbuffer.h>

namespace Sim::Config
{
    Config ConfigReader::Read(char* relativeConfigFilePath)
    {
        auto path = getPathFromRelative(relativeConfigFilePath);

        std::ifstream file(path);
        std::stringstream buffer;
        buffer << file.rdbuf();

        auto jsonString = buffer.str();

        rapidjson::Document document;
        document.Parse(jsonString.c_str());

        auto port = document["port"].GetInt();

        auto instruments = document["instruments"].GetArray();
        std::vector<Instrument> instrumentVector;
        for (const auto& instrument : instruments)
        {
            auto name = instrument["name"].GetString();
            auto positionLimit = instrument["positionLimit"].GetUint();
            auto tickSizeCents = instrument["tickSize"].GetUint();

            instrumentVector.emplace_back(
                Instrument{ .mName = name, .mPositionLimit = positionLimit, .mTickSizeCents = tickSizeCents });
        }

        return Config(port, instrumentVector);
    }

    bool ConfigReader::Validate(int argc, char* argv[]) const
    {
        if (argc != 2)
        {
            std::cout << "Usage: " << argv[0] << " <config_file>" << std::endl;
            return false;
        }

        if (!std::filesystem::exists(getPathFromRelative(argv[1])))
        {
            std::cout << "Config file " << argv[1] << " does not exist!" << std::endl;
            return false;
        }

        return true;
    }

    std::filesystem::path ConfigReader::getPathFromRelative(char* relativeConfigFilePath) const
    {
        return std::filesystem::current_path().append(relativeConfigFilePath);
    }
} // namespace Sim::Config
