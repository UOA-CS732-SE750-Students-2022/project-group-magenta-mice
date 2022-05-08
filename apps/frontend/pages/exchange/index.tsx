import {
  CardColors,
  ExchangeCard,
  Layout,
  Loading,
} from "@simulate-exchange/components";
import { useEmoji, useLoggedInRedirect } from "@simulate-exchange/hooks";
import { useMemo } from "react";
import { useFullLoader } from "@simulate-exchange/hooks";
import {
  useCreateTestExchangeMutation,
  useCurrentUserQuery,
} from "@simulate-exchange/gql";

export default function Index() {
  const { loggedIn, loading, user } = useLoggedInRedirect();
  useFullLoader(loading);
  return (
    <Layout.Page>
      {loggedIn ? <AuthComponent user={user} /> : <></>}
    </Layout.Page>
  );
}

const AuthComponent = ({ user }) => {
  const { data, loading } = useCurrentUserQuery();
  const firstName = useMemo(
    () => ", " + user?.displayName?.split(" ")?.[0] ?? "",
    [user],
  );

  const Celebrate = useEmoji("🎉", "3rem");
  const Bank = useEmoji("🏦", "2rem");
  if (loading) return <Loading />;
  return (
    <div className="flex flex-col">
      <p className="flex items-center gap-x-4 text-4xl font-bold text-gray-50">
        {`Welcome${firstName}`}
        <Celebrate />
      </p>
      <p className="mb-5 flex items-center gap-x-3 pt-10 text-2xl font-medium text-gray-50">
        My Exchanges
        <Bank />
      </p>
      <div className="flex grid-cols-2 flex-col justify-center gap-6 md:grid">
        {data?.currentUser.userPermissions.map((permission) => (
          <ExchangeCard
            key={permission.exchange.id}
            colour={CardColors[permission.exchange.colour]}
            name={permission.exchange.name}
            currentInstruments={permission.exchange.instruments.map(
              (instrument) => ({
                name: instrument.name,
                type: "",
              }),
            )}
            participants={permission.exchange.userPermissions.length}
            isAddCard={false}
            id={permission.exchange.id}
          />
        ))}
        <ExchangeCard isAddCard={true} />
      </div>
    </div>
  );
};
