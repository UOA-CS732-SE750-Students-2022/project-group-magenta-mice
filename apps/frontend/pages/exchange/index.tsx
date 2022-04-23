import {
  CardColors,
  ExchangeCard,
  Layout,
} from "@simulate-exchange/components";
import { useEmoji, useLoggedInRedirect } from "@simulate-exchange/hooks";
import { useMemo } from "react";

export function Index() {
  const { user } = useLoggedInRedirect();
  const firstName = useMemo(
    () => ", " + user?.displayName?.split(" ")?.[0] ?? "",
    [user],
  );

  const Celebrate = useEmoji("🎉", "3rem");
  const Bank = useEmoji("🏦", "2rem");

  const Globe = useEmoji("🌍", "2rem");
  const Trumpet = useEmoji("🎺", "2rem");
  const Check = useEmoji("✅", "2rem");

  return (
    <Layout.Page
      sidebar={
        <div className="flex flex-col divide-y text-white">
          <button className="flex items-center gap-x-6 py-6 pl-8 pr-20 font-semibold transition-all hover:bg-neutral-700">
            <Globe />
            Overview
          </button>
          <button className="flex items-center gap-x-6 py-6 pl-8 pr-20 font-semibold transition-all hover:bg-neutral-700">
            <Trumpet />
            Instruments
          </button>
          <button className="flex items-center gap-x-6 py-6 pl-8 pr-20 font-semibold transition-all hover:bg-neutral-700">
            <Check />
            Permissions
          </button>
        </div>
      }
    >
      <div className="flex flex-col">
        <p className="flex items-center gap-x-4 text-4xl font-bold text-gray-50">
          {`Welcome${firstName}`}
          <Celebrate />
        </p>
        <p className="bg- mb-5 flex items-center gap-x-3 pt-10 text-2xl font-medium text-gray-50">
          My Exchanges
          <Bank />
        </p>
        <div className="flex grid-cols-2 flex-col justify-center gap-6 md:grid">
          <ExchangeCard
            colour={CardColors[1]}
            name={"New York Stock Exchange"}
            isAddCard={false}
          />
          <ExchangeCard
            colour={CardColors[2]}
            name={"New York Stock Exchange"}
            isAddCard={false}
          />
          <ExchangeCard
            colour={CardColors[3]}
            name={"New York Stock Exchange"}
            isAddCard={false}
          />
          <ExchangeCard
            colour={CardColors[4]}
            name={"New York Stock Exchange"}
            isAddCard={false}
          />
          <ExchangeCard
            colour={CardColors[5]}
            name={"New York Stock Exchange"}
            isAddCard={false}
          />
          <ExchangeCard
            colour={CardColors[6]}
            name={"New York Stock Exchange"}
            isAddCard={false}
          />
          <ExchangeCard isAddCard={true} />
        </div>
      </div>
    </Layout.Page>
  );
}

export default Index;
