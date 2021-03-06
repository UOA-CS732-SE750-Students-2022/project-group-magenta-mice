#include "config_reader.h"

#include <fstream>
#include <iostream>
#include <rapidjson/document.h>
#include <rapidjson/stringbuffer.h>

namespace Sim::Config
{
    ConfigReader::ConfigReader(Common::IFileStringReader& fileStringReader) : mFileStringReader(fileStringReader) {}

    ExchangeConfig ConfigReader::read(const char* relativeConfigFilePath)
    {
        auto path = getPathFromRelative(relativeConfigFilePath);

        auto jsonString = mFileStringReader.getContents(path);

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
            auto identifier = instrument["id"].GetString();

            instrumentVector.emplace_back(Instrument{
                .mName = name, .mPositionLimit = positionLimit, .mTickSizeCents = tickSizeCents, .mId = identifier });
        }

        auto dbString = document["database"].GetString();
        auto exchangeId = document["exchangeId"].GetString();
        auto marketMakerKey = document["marketMakerKey"].GetString();

        return ExchangeConfig(port, instrumentVector, dbString, exchangeId, marketMakerKey);
    }

    bool ConfigReader::validate(int argc, char* argv[]) const
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

    std::filesystem::path ConfigReader::getPathFromRelative(const char* relativeConfigFilePath) const
    {
        return std::filesystem::current_path().append(relativeConfigFilePath);
    }
} // namespace Sim::Config
