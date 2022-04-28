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
      className="rounded bg-blue-600 py-1 px-2 font-semibold transition-colors hover:bg-blue-500 focus:outline-none"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
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
