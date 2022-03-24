import React from "react";

interface CircleHazeProps {
  colors?: string;
  offsets?: string;
  sizes?: string;
}

export const Haze: React.FC<CircleHazeProps> = ({
  colors = "from-pink-500 to-rose-500",
  offsets = "-ml-24 -mt-12",
  sizes = "w-2/3 h-72",
}) => {
  const style = `${colors} ${offsets} ${sizes}`;
  return (
    <div className="w-screen h-screen overflow-hidden absolute">
      <div
        className={`absolute bg-gradient-to-br rounded-full top-0 -z-10 blur-[150px] filter ${style}`}
      />
    </div>
  );
};
