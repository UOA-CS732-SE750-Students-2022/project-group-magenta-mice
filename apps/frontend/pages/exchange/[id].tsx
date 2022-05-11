import { useFindExchangeQuery } from "@simulate-exchange/gql";
import {
  AppLogo,
  ExchangeLeaderboard,
  InstrumentCard,
  InstrumentSettings,
  OverviewSettings,
  PermissionSettings,
  useInstrumentSettingsController,
  useOverviewSettingsController,
  usePermissionSettingsController,
  UserDropdown,
} from "@simulate-exchange/components";
import {
  useCurrency,
  useEmoji,
  useFullLoader,
  useLoggedInRedirect,
} from "@simulate-exchange/hooks";
import {
  ChevronDoubleLeftIcon,
  HomeIcon,
  TrendingUpIcon,
  LinkIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  CogIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import ReactToolTip from "react-tooltip";
import { getAuth } from "@firebase/auth";

enum SubPage {
  HOME,
  INSTRUMENTS,
  ACCESS,
  SETTINGS,
}

const sidebar = [
  { icon: <HomeIcon />, label: "Overview", page: SubPage.HOME, admin: false },
  {
    icon: <TrendingUpIcon />,
    label: "Instruments",
    page: SubPage.INSTRUMENTS,
    admin: true,
  },
  {
    icon: <LinkIcon />,
    label: "Access Info",
    page: SubPage.ACCESS,
    admin: false,
  },
  { icon: <CogIcon />, label: "Settings", page: SubPage.SETTINGS, admin: true },
];

export function ExchangeDashboard() {
  const router = useRouter();
  const { loading: loggedInLoading } = useLoggedInRedirect();
  const { id } = router.query;
  const {
    error,
    data,
    loading: dataLoading,
  } = useFindExchangeQuery({
    variables: { id: id as string },
    skip: !id || loggedInLoading,
  });

  const [currentSubPage, setCurrentSubPage] = useState(SubPage.HOME);
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    setDarkMode(
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
  }, []);

  const instrumentPL = useMemo(
    () =>
      data?.exchange.profitLoss.reduce(
        (acc, curr) => ({ ...acc, [curr.instrument]: curr.profitLoss }),
        {} as { [key: string]: number },
      ),
    [data],
  );

  const totalPL = useMemo(
    () =>
      Object.values(instrumentPL ?? {}).reduce((acc, curr) => acc + curr, 0),
    [instrumentPL],
  );

  const totalPLDisplay = useCurrency(totalPL);
  const plColors = useMemo(
    () =>
      totalPL >= 0
        ? "from-red-500 via-purple-400 to-blue-500"
        : "from-red-500 via-orange-500 to-pink-500",
    [totalPL],
  );

  const leaderboard = useMemo(
    () =>
      data?.exchange.userPermissions.map((u) => ({
        name: u.user.name,
        imageUrl: u.user.profilePicUrl,
        profitLoss: u.user.profitLoss,
      })),
    [data],
  );

  const currentUserPermission = useMemo(() => {
    const currentUid = getAuth().currentUser?.uid;
    return data?.exchange.userPermissions.find((u) => u.user.id === currentUid);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      router.push("/");
    }
  }, [error, router]);

  useFullLoader(loggedInLoading || dataLoading);

  const SadFace = useEmoji("☹", "2rem");
  const instruments = data?.exchange.instruments;
  const handleTheme = () => {
    const flag = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", flag ? "dark" : "light");
    setDarkMode(flag);
  };

  return (
    <div className="max-w-screen flex min-h-screen flex-col bg-white dark:bg-neutral-900 md:flex-row">
      {/* sidebar desktop*/}
      <div className="static hidden w-32 flex-col justify-between border-r px-4 py-9 dark:border-r-black dark:bg-neutral-800 md:flex md:px-8">
        <button onClick={() => router.push("/")}>
          <AppLogo />
        </button>
        <div className="flex flex-col gap-8">
          {sidebar.map((item) => {
            if (item.admin && currentUserPermission?.permission !== "ADMIN")
              return null;
            return (
              <div key={item.page}>
                {isMounted && (
                  <ReactToolTip id={item.label} place="right" effect="solid">
                    {item.label}
                  </ReactToolTip>
                )}
                <button
                  data-tip
                  data-for={item.label}
                  className={classNames(
                    "flex items-center justify-center rounded-xl bg-transparent p-2",
                    {
                      "bg-blue-400 text-gray-50": currentSubPage === item.page,
                      "text-gray-600 transition-all hover:bg-blue-400 hover:text-gray-50 dark:text-gray-50":
                        currentSubPage !== item.page,
                    },
                  )}
                  onClick={() => setCurrentSubPage(item.page)}
                >
                  {item.icon}
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4">
          {isMounted && (
            <ReactToolTip id="theme" place="right" effect="solid">
              Swap Theme
            </ReactToolTip>
          )}
          <button
            data-tip
            data-for="theme"
            className="flex items-center justify-center rounded-xl bg-transparent p-2 text-gray-600 transition-all hover:bg-blue-400 hover:text-gray-50 dark:text-gray-50"
            onClick={handleTheme}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {isMounted && (
            <ReactToolTip id="back" place="right" effect="solid">
              Go Back
            </ReactToolTip>
          )}
          <button
            data-tip
            data-for="back"
            className="flex items-center justify-center rounded-xl bg-transparent p-2 text-gray-600 transition-all hover:bg-blue-400 hover:text-gray-50 dark:text-gray-50"
            onClick={() => router.push("/exchange")}
          >
            <ChevronDoubleLeftIcon />
          </button>
        </div>
      </div>

      {/* header mobile */}
      <div className="flex h-16 w-screen items-center justify-between border-b-2 px-4 dark:border-black dark:bg-neutral-800 md:hidden">
        <button className="h-12 w-12" onClick={() => router.push("/")}>
          <AppLogo />
        </button>
        <button
          className="flex w-12 items-center justify-center rounded-xl bg-transparent p-2 text-gray-600 transition-all hover:bg-blue-400 hover:text-gray-50 dark:text-gray-50"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MenuIcon />
        </button>
      </div>

      {/* mobile menu */}
      {showMenu && (
        <div className="absolute top-20 right-4 z-50 flex w-96 flex-col gap-2 rounded-lg border-2 border-black bg-white p-2 text-gray-600 shadow-lg dark:bg-neutral-800 md:hidden">
          {sidebar.map((item) => (
            <div key={item.page} className="">
              <button
                className={classNames(
                  "flex w-full items-center rounded px-2 py-2 ",
                  {
                    "bg-blue-400 text-gray-50": currentSubPage === item.page,
                    "text-gray-600 transition-all hover:bg-blue-400 hover:text-gray-50 dark:text-gray-50":
                      currentSubPage !== item.page,
                  },
                )}
                onClick={() => {
                  setCurrentSubPage(item.page);
                  setShowMenu(false);
                }}
              >
                <div className="h-8 w-8 dark:text-gray-50">{item.icon}</div>
                <span className="ml-2">{item.label}</span>
              </button>
            </div>
          ))}
          <button
            onClick={handleTheme}
            className="flex w-full items-center gap-2 rounded px-2 py-2 hover:bg-blue-400 hover:text-gray-50 dark:text-gray-50 "
          >
            {darkMode ? (
              <SunIcon className="h-8 w-8" />
            ) : (
              <MoonIcon className="h-8 w-8" />
            )}
            Swap Theme
          </button>
        </div>
      )}

      {/* content */}
      <div className="mt-4 flex w-full flex-col text-gray-600 dark:text-gray-50 md:mt-0 md:min-h-screen">
        {/*desktop header */}
        <div className="hidden w-full items-center justify-between p-8 md:flex">
          <span className="font-['Inter'] text-2xl font-bold xl:text-4xl">
            {data?.exchange.name}
          </span>
          <UserDropdown />
        </div>

        <div className="px-4 md:px-8">
          {currentSubPage === SubPage.INSTRUMENTS && (
            <InstrumentSettings
              useController={useInstrumentSettingsController}
              exchangeId={id.toString()}
              instruments={data?.exchange.instruments ?? []}
            />
          )}

          {currentSubPage === SubPage.ACCESS && (
            <PermissionSettings
              useController={usePermissionSettingsController}
            />
          )}

          {data && currentSubPage === SubPage.SETTINGS && (
            <OverviewSettings
              useController={useOverviewSettingsController}
              currentExchange={data.exchange}
              exchangeID={id as string}
            />
          )}

          {currentSubPage === SubPage.HOME && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 text-lg font-semibold md:text-2xl">
                <span>Your Profit/Loss:</span>
                <span
                  className={classNames(
                    "bg-gradient-to-r bg-clip-text text-center font-bold text-transparent",
                    plColors,
                  )}
                >
                  {totalPLDisplay}
                </span>
              </div>

              <div className="flex flex-col gap-4 md:justify-between md:gap-8 xl:flex-row">
                <span className="block font-['Inter'] text-2xl font-bold md:hidden">
                  Exchange - {data?.exchange.name}
                </span>
                <div className="flex w-full flex-col gap-4 md:gap-8">
                  <div className="flex w-full flex-col gap-2">
                    <span className="text-lg font-semibold md:text-2xl">
                      Instruments
                    </span>
                    {instruments?.length < 1 ? (
                      <div className="text-gray-400">
                        <span className="mr-2">
                          Your Instruments are currently Empty!
                        </span>
                        <SadFace />
                        <p>To add, go to Settings {">"} Instruments</p>
                      </div>
                    ) : (
                      <>
                        {instruments?.map((instrument) => (
                          <InstrumentCard
                            key={instrument.id}
                            instrument={instrument}
                            instrumentPL={instrumentPL[instrument.id]}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className="flex w-full flex-col gap-2 xl:max-w-md">
                  <span className="text-lg font-semibold md:text-2xl">
                    Leaderboard
                  </span>
                  <ExchangeLeaderboard topUsers={leaderboard} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExchangeDashboard;
