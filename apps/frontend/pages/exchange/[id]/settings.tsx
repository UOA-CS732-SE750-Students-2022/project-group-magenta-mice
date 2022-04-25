import {
  Layout,
  InstrumentSettings,
  useInstrumentSettingsController,
  OverviewSettings,
  useOverviewSettingsController,
  PermissionSettings,
  usePermissionSettingsController,
} from "@simulate-exchange/components";
import { useEmoji } from "@simulate-exchange/hooks";

import { useRouter } from "next/router";
import { useState } from "react";

export const Settings = () => {
  const router = useRouter();
  const { id } = router.query;

  const currentInstruments = [
    {
      name: "ABCD",
      type: "Bond",
    },
    {
      name: "FGGH",
      type: "Bond",
    },
    {
      name: "AAPL",
      type: "Bond",
    },
    {
      name: "QQQ",
      type: "Stock",
    },
  ];
  const exchangeList = [
    {
      name: "New York Stock Exchange",
      id: "1",
      instruments: { currentInstruments },
    },
    {
      name: "London Stock Exchange",
      id: "2",
      instruments: { currentInstruments },
    },
    {
      name: "Paris Stock Exchange",
      id: "3",
      instruments: { currentInstruments },
    },
  ];
  const Globe = useEmoji("🌍", "2rem");
  const Trumpet = useEmoji("🎺", "2rem");
  const Check = useEmoji("✅", "2rem");

  const [selectedSettings, setSelectedSettings] = useState("Overview");

  return (
    <Layout.Page
      sidebar={
        <div className="flex flex-col divide-y text-white">
          <button
            className="flex items-center gap-x-6 py-6 pl-8 pr-20 font-semibold transition-all hover:bg-neutral-700"
            onClick={() => setSelectedSettings("Overview")}
          >
            <Globe />
            Overview
          </button>
          <button
            className="flex items-center gap-x-6 py-6 pl-8 pr-20 font-semibold transition-all hover:bg-neutral-700"
            onClick={() => setSelectedSettings("Instruments")}
          >
            <Trumpet />
            Instruments
          </button>
          <button
            className="flex items-center gap-x-6 py-6 pl-8 pr-20 font-semibold transition-all hover:bg-neutral-700"
            onClick={() => setSelectedSettings("Permissions")}
          >
            <Check />
            Permissions
          </button>
        </div>
      }
    >
      <div className="flex flex-col">
        <p className="flex items-center gap-x-4 text-gray-400">
          exchangename {">"} settings
        </p>
        {selectedSettings === "Overview" && (
          <OverviewSettings useController={useOverviewSettingsController} />
        )}
        {selectedSettings === "Instruments" && (
          <InstrumentSettings useController={useInstrumentSettingsController} />
        )}
        {selectedSettings === "Permissions" && (
          <PermissionSettings useController={usePermissionSettingsController} />
        )}
      </div>
    </Layout.Page>
  );
};

export default Settings;
