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
import { Sidebar, useSidebarController } from "@simulate-exchange/components";

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

  const handlePageChange = (page: SettingsPage) => {
    setSelectedSettings(page);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Layout.Page
      sidebar={
        <Sidebar
          options={[
            { page: "Overview", emoji: Globe },
            { page: "Instruments", emoji: Trumpet },
            { page: "Permissions", emoji: Check },
          ]}
          setPage={handlePageChange}
          currentPage={selectedSettings}
          useController={useSidebarController}
        />
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
