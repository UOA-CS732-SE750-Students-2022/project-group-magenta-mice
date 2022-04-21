import React, { useState } from "react";
import cx from "classnames";
interface ColourSelectProps {
  useController: typeof useColourSelectController;
}
export const CardColours = {
  1: "bg-rose-600 ",
  2: "bg-sky-500 ",
  3: "bg-amber-500 ",
  4: "bg-gradient-to-br from-purple-500 to-sky-400 ",
  5: "bg-gradient-to-br from-teal-500 to-lime-500 ",
  6: "bg-gradient-to-br from-fuchsia-500 to-rose-700 ",
};
export const ColourSelect: React.FC<ColourSelectProps> = ({
  useController,
}) => {
  const { selectedColour, setSelectedColour } = useController();

  return (
    <div className=" flex justify-center gap-2">
      {Object.entries(CardColours).map(([key, value]) => (
        <div
          key={key}
          onClick={() => setSelectedColour(+key)}
          className={cx(
            { "border-2": selectedColour === +key },
            value,
            "h-10 w-10 cursor-pointer rounded-full hover:brightness-110",
          )}
        ></div>
      ))}
    </div>
  );
};

export const useColourSelectController = () => {
  const [selectedColour, setSelectedColour] = useState(1);
  return { selectedColour, setSelectedColour };
};

export const useMockColourSelectController: typeof useColourSelectController =
  () => {
    const [selectedColour, setSelectedColour] = useState(1);
    return { selectedColour, setSelectedColour };
  };

export default ColourSelect;
