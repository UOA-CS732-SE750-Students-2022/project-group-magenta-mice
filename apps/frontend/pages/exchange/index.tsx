import { ExchangeCard } from "@simulate-exchange/components";
import { useFullLoader, useRandomImage } from "@simulate-exchange/hooks";
import { useEffect, useState } from "react";

export function Index() {
  const { randomImage, isLoading } = useRandomImage();
  const [urlLoading, setUrlLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    const img = new Image();
    const finishLoading = () => setUrlLoading(false);
    img.addEventListener("load", finishLoading);
    img.src = randomImage;
    return () => img.removeEventListener("load", finishLoading);
  }, [setUrlLoading, randomImage]);

  useFullLoader(isLoading || urlLoading);
  return (
    <>
      <div className="flex flex-col">
        <p className="font-bold text-4xl pt-10 pl-10 text-gray-50">
          Welcome, Name
        </p>
        <p className="text-2xl pt-10 pl-10 text-gray-50">My exchanges</p>
        <div className="flex flex-row flex-wrap">
          <ExchangeCard name={"Name of Exchange"} isAddCard={false} />
          <ExchangeCard name={"Name of Exchange"} isAddCard={false} />
          <ExchangeCard isAddCard={true} />
        </div>
      </div>
    </>
  );
}

export default Index;
