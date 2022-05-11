import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import React from "react";

interface HideShowButtonProps {
  useController: typeof useHideShowButtonController;
  isShown: boolean;
  onClick: () => void;
}

export const HideShowButton: React.FC<HideShowButtonProps> = ({
  useController,
  isShown,
  onClick,
}) => {
  return (
    <button
      className="m-1 w-[5.25rem] rounded bg-blue-600 py-1 px-2 font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none active:hover:bg-blue-700"
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-2">
        <span>{isShown ? "Hide" : "Show"}</span>
        {isShown ? <EyeOffIcon className="w-5" /> : <EyeIcon className="w-5" />}
      </div>
    </button>
  );
};

export const useHideShowButtonController = () => {
  return {};
};

export const useMockHideShowButtonController: typeof useHideShowButtonController =
  () => {
    return {};
  };

export default HideShowButton;
