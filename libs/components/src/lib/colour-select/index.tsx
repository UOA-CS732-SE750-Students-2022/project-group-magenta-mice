import React, { useState } from "react";
import cx from "classnames";

interface ColorSelectProps {
  useController: typeof useColorSelectController;
}
export const CardColors = {
  1: "bg-rose-600 ",
  2: "bg-sky-500 ",
  3: "bg-amber-500 ",
  4: "bg-gradient-to-br from-purple-500 to-sky-400 ",
  5: "bg-gradient-to-br from-teal-500 to-lime-500 ",
  6: "bg-gradient-to-br from-fuchsia-500 to-rose-700 ",
};
export const ColorSelect: React.FC<ColorSelectProps> = ({ useController }) => {
  const { selectedColor, setSelectedColor } = useController();

  return (
    <div className=" flex justify-center gap-2.5">
      {Object.entries(CardColors).map(([key, value]) => (
        <div
          key={key}
          onClick={() => setSelectedColor(+key)}
          className={cx(
            {
              "outline-3 outline outline-white": selectedColor === +key,
            },
            value,
            "h-10 w-10 cursor-pointer rounded-full transition-all duration-100 hover:brightness-110",
          )}
        ></div>
      ))}
    </div>
  );
};

export const useColorSelectController = () => {
  const [selectedColor, setSelectedColor] = useState(1);
  return { selectedColor, setSelectedColor };
};

export const useMockColorSelectController: typeof useColorSelectController =
  () => {
    const [selectedColor, setSelectedColor] = useState(1);
    return {
      selectedColor,
      setSelectedColor,
    };
  };

export default ColorSelect;
