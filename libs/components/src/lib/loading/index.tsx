import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="w-screen h-screen fixed z-[100] top-0 left-0 bg-neutral-900">
      <div className="w-full h-full flex flex-col justify-center items-center text-2xl font-bold text-gray-900 gap-y-4">
        <lottie-player
          src={
            "https://assets8.lottiefiles.com/private_files/lf30_kix6gt4u.json"
          }
          background="transparent"
          speed="1"
          style={{ width: "960px", height: "960px", margin: "-20rem" }}
          loop
          autoplay
        />
        <div className="text-gray-50 text-4xl">Loading...</div>
      </div>
    </div>
  );
};
