import { useFullLoader, useRandomImage } from "@simulate-exchange/hooks";
import { useEffect, useState } from "react";
import { ReactComponent as PlusSign } from "../../../../libs/assets/src/lib/plus-sign.svg";

export function Index() {
  const { randomImage, isLoading } = useRandomImage();
  const [urlLoading, setUrlLoading] = useState(true);

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
          {/* Will refactor into component  */}
          <div className="w-80 h-44 mt-5 ml-10 pt-4 pl-4 rounded-lg bg-slate-800 text-gray-300 cursor-pointer hover:bg-slate-700">
            TESTEST
          </div>
          <div className="w-80 h-44 mt-5 ml-10 pt-4 pl-4 rounded-lg bg-slate-800 text-gray-300 cursor-pointer hover:bg-slate-700">
            TESTEST
          </div>
          <div className="w-80 h-44 mt-5 ml-10 pt-4 pl-4 rounded-lg bg-slate-800 text-gray-300 cursor-pointer hover:bg-slate-700">
            TESTEST
          </div>
          <div className="w-80 h-44 mt-5 ml-10 pt-4 pl-4 rounded-lg bg-slate-800 text-gray-300 cursor-pointer hover:bg-slate-700">
            TESTEST
          </div>
          <div className="w-80 h-44 mt-5 ml-10 pt-4 pl-4 rounded-lg bg-slate-800 text-gray-300 cursor-pointer hover:bg-slate-700">
            TESTEST
          </div>
          <div className="w-80 h-44 mt-5 ml-10 pt-4 pl-4 rounded-lg bg-slate-800 text-gray-300 cursor-pointer hover:bg-slate-700">
            <PlusSign className="w-12 h-12"></PlusSign>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
