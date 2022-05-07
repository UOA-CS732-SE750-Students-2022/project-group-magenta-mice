import { Layout } from "@simulate-exchange/components";
import { useFindExchangeQuery } from "@simulate-exchange/gql";
import { useFullLoader, useLoggedInRedirect } from "@simulate-exchange/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      router.push("/");
    }
  }, [error, router]);

  useFullLoader(loggedInLoading || dataLoading);

  return (
    <Layout.Page>
      <div className="flex flex-col gap-4 text-white">
        <div>
          <span className="text-3xl font-bold">{data?.exchange.name}</span>
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

        <div className="flex items-center">
          <p className="text-2xl font-semibold">My Instruments</p>
        </div>
      </div>
    </Layout.Page>
  );
}

export default Exchange;
