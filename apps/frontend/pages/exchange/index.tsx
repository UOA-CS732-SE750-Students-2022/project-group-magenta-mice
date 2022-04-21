import {
  ExchangeCard,
  Layout,
  CardColours,
} from "@simulate-exchange/components";
import { useFullLoader, useRandomImage } from "@simulate-exchange/hooks";
import { useEffect, useState } from "react";
import { useEmoji } from "@simulate-exchange/hooks";

export function Index() {
  const { randomImage, isLoading } = useRandomImage();
  const [urlLoading, setUrlLoading] = useState(true);
  const Celebrate = useEmoji("🎉", "3rem");
  const Bank = useEmoji("🏦", "2rem");

  useEffect(() => {
    const img = new Image();
    const finishLoading = () => setUrlLoading(false);
    img.addEventListener("load", finishLoading);
    img.src = randomImage;
    return () => img.removeEventListener("load", finishLoading);
  }, [setUrlLoading, randomImage]);

  useFullLoader(isLoading || urlLoading);
  return (
    <Layout.Page>
      <div className="flex flex-col">
        <p className="flex items-center gap-x-4 pt-10 text-4xl font-bold text-gray-50">
          Welcome, Name
          <Celebrate />
        </p>
        <p className="bg- mb-5 flex items-center gap-x-3 pt-10 text-2xl font-medium text-gray-50">
          My Exchanges
          <Bank />
        </p>
        <div className="flex grid-cols-2 flex-col justify-center gap-6 md:grid">
          <ExchangeCard
            colour={CardColours[1]}
            name={"New York Stock Exchange"}
            isAddCard={false}
          />
          <ExchangeCard
            colour={CardColours[2]}
            name={"New York Stock Exchange"}
            isAddCard={false}
          />
          <ExchangeCard
            colour={CardColours[3]}
            name={"New York Stock Exchange"}
            isAddCard={false}
          />
          <ExchangeCard
            colour={CardColours[4]}
            name={"New York Stock Exchange"}
            isAddCard={false}
          />
          <ExchangeCard
            colour={CardColours[5]}
            name={"New York Stock Exchange"}
            isAddCard={false}
          />
          <ExchangeCard
            colour={CardColours[6]}
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
