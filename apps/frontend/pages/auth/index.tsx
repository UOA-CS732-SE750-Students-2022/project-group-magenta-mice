import {
  LoginPanel,
  useLoginPanelController,
} from "@simulate-exchange/components";
import { useFullLoader, useRandomImage } from "@simulate-exchange/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function Index() {
  const { randomImage, isLoading } = useRandomImage();
  const [urlLoading, setUrlLoading] = useState(true);
  const router = useRouter();
  const { invite } = router.query

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
      <div
        style={{
          backgroundImage: "url(" + randomImage + ")",
        }}
        className={"h-screen w-screen bg-no-repeat bg-cover absolute -z-10"}
      />
      <div className="h-screen w-screen justify-center items-center flex">
        <LoginPanel useController={useLoginPanelController} invite={invite as string} />
      </div>
    </>
  );
}

export default Index;
