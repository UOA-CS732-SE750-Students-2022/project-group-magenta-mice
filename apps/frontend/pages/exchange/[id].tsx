import {
  InstrumentCard,
  Layout,
  ExchangeLeaderboard,
} from "@simulate-exchange/components";
import { useFindExchangeQuery } from "@simulate-exchange/gql";
import {
  useCurrency,
  useEmoji,
  useFullLoader,
  useLoggedInRedirect,
} from "@simulate-exchange/hooks";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

export function Exchange() {
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

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      router.push("/");
    }
  }, [error, router]);

  useFullLoader(loggedInLoading || dataLoading);

  const SadFace = useEmoji("☹", "2rem");
  const instruments = data?.exchange.instruments;

  return (
    <Layout.Page>
      <div className="flex flex-col">
        <div className="mb-4">
          <span className="items-center gap-x-4 text-4xl font-bold text-gray-50">
            {data?.exchange.name}
          </span>
          <span className="float-right">
            <button
              type="button"
              className="inline-flex w-36 justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-500"
              onClick={() => router.push("/exchange/" + id + "/settings")}
            >
              Settings
            </button>
          </span>
        </div>

        <div className="flex flex-col gap-y-1.5 rounded-lg bg-neutral-800 py-4">
          <h3
            className={classNames("text-center text-xl font-medium text-white")}
          >
            {"Your total P/L is"}
          </h3>
          <h2
            className={classNames(
              "bg-gradient-to-r bg-clip-text text-center text-5xl font-bold text-transparent",
              plColors,
            )}
          >
            {totalPLDisplay}
          </h2>
        </div>

        <p className="mb-5 flex items-center gap-x-3 pt-10 text-2xl font-medium text-gray-50">
          Instruments
        </p>
        <div className="flex grid-cols-2 flex-col justify-center gap-6 md:grid">
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
        <p className="mb-8 flex items-center gap-x-3 pt-10 text-2xl font-medium text-gray-50">
          Leaderboard
        </p>
        <div className="flex w-full justify-center">
          <ExchangeLeaderboard topUsers={leaderboard} />
        </div>
      </div>
    </Layout.Page>
  );
}

export default Exchange;
