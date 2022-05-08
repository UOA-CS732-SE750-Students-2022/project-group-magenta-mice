import {
  Layout,
  InstrumentCard,
  useInstrumentCardController,
} from "@simulate-exchange/components";
import { useFindExchangeQuery } from "@simulate-exchange/gql";
import { useFullLoader, useLoggedInRedirect } from "@simulate-exchange/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import stc from "string-to-color";

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

  const instruments = data?.exchange.instruments;

  return (
    <Layout.Page>
      <div className="flex flex-col text-white">
        <div>
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

        <p className="mb-5 flex items-center gap-x-3 pt-10 text-2xl font-medium text-gray-50">
          My Instruments
        </p>

        <div className="flex grid-cols-2 flex-col justify-center gap-3 md:grid">
          {instruments?.map((instrument) => (
            <InstrumentCard
              key={instrument.id}
              color={stc(instrument.name)}
              useController={useInstrumentCardController}
              instrument={instrument}
            />
          ))}
        </div>
      </div>
    </Layout.Page>
  );
}

export default Exchange;
