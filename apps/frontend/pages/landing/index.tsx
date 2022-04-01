import { DividedText } from "@simulate-exchange/components";
import { useFullLoader, useRandomImage } from "@simulate-exchange/hooks";
import { useEffect, useState } from "react";
import cx from "classnames";
const color = "bg-emerald-600 hover:bg-emerald-500 transition-colors";
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
    {/* style={{backgroundImage: "url(" + randomImage + ")"}} */}
      <div 
      className="h-screen w-screen justify-center items-center flex flex-col bg-cover"  
      style={{backgroundImage: "linear-gradient(to top, rgba(23, 23, 23, 1), rgba(195, 195, 195, 0.3)), url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1)"}}
      >
        <h1 className="text-white text-7xl font-semibold">Simulate.Exchange</h1>
        <br/>
        <DividedText text="Create an exchange NOW" className="text-gray-200 text-2xl" />
        <br/>
        <button
          className={cx(
            color,
            "text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline",
          )}
          type="button"
        >
          Get started
        </button>
      </div>
    </>
  );
}

export default Index;
