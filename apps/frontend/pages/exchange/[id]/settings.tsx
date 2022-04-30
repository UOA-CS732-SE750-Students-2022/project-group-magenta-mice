import {
  Layout,
  InstrumentSettings,
  useInstrumentSettingsController,
  OverviewSettings,
  useOverviewSettingsController,
  PermissionSettings,
  usePermissionSettingsController,
  Loading,
} from "@simulate-exchange/components";
import {
  useEmoji,
  useFullLoader,
  useLoggedInRedirect,
} from "@simulate-exchange/hooks";

import { useRouter } from "next/router";
import { useState } from "react";
import { useCurrentUserQuery } from "@simulate-exchange/gql";

export default function Settings() {
  const { loggedIn, loading, user } = useLoggedInRedirect();
  useFullLoader(loading);

  return <>{loggedIn ? <SettingsComponent user={user} /> : <></>}</>;
}

const SettingsComponent = ({ user }) => {
  const { data, loading } = useCurrentUserQuery();
  const router = useRouter();
  const { id } = router.query;

  // console log to find ids for testing.
  console.log(data?.currentUser.userPermissions);

  const currentPermission = data?.currentUser.userPermissions.find(
    (permission) => permission.exchange.id === id,
  );

  const currentExchange = currentPermission?.exchange;
  console.log("current exchange name :", currentExchange?.name);
  console.log("current exchange instruments :", currentExchange?.instruments);

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
            useController={useOverviewSettingsController}
          />
        )}
        {selectedSettings === "Instruments" && (
          <InstrumentSettings
            useController={useInstrumentSettingsController}
            exchangeId={id.toString()}
            instruments={currentExchange.instruments}
          />
        )}
        {selectedSettings === "Permissions" && (
          <PermissionSettings useController={usePermissionSettingsController} />
        )}
      </div>
    </Layout.Page>
  );
};
