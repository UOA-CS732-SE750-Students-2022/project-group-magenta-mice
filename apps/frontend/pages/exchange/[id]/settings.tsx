import {
  Layout,
  InstrumentSettings,
  useInstrumentSettingsController,
  OverviewSettings,
  useOverviewSettingsController,
  PermissionSettings,
  usePermissionSettingsController,
  Loading,
  useMockPermissionSettingsController,
} from "@simulate-exchange/components";
import {
  useEmoji,
  useFullLoader,
  useLoggedInRedirect,
} from "@simulate-exchange/hooks";

import { useRouter } from "next/router";
import { useState } from "react";
import { useFindExchangeQuery } from "@simulate-exchange/gql";

export default function Settings() {
  const { loggedIn, loading, user } = useLoggedInRedirect();
  useFullLoader(loading);

  return <>{loggedIn ? <SettingsComponent user={user} /> : <></>}</>;
}

const SettingsComponent = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useFindExchangeQuery({
    variables: {
      id: id.toString(),
    },
  });

  const currentExchange = data?.exchange;
  const Globe = useEmoji("🌍", "2rem");
  const Trumpet = useEmoji("🎺", "2rem");
  const Check = useEmoji("✅", "2rem");

  type SettingsPage = "Overview" | "Instruments" | "Permissions";
  const [selectedSettings, setSelectedSettings] =
    useState<SettingsPage>("Overview");

  if (loading) {
    return <Loading />;
  }
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
          {currentExchange?.name} {">"} settings
        </p>

        {selectedSettings === "Overview" && (
          <OverviewSettings
            currentExchange={currentExchange}
            exchangeID={id.toString()}
            useController={useOverviewSettingsController}
          />
        )}
        {selectedSettings === "Instruments" && (
          <InstrumentSettings
            useController={useInstrumentSettingsController}
            exchangeId={id.toString()}
            instruments={currentExchange?.instruments}
          />
        )}
        {selectedSettings === "Permissions" && (
          <PermissionSettings useController={usePermissionSettingsController} />
        )}
      </div>
    </Layout.Page>
  );
};
