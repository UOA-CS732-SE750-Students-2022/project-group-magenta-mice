import { DuplicateIcon } from "@heroicons/react/outline";
import React from "react";

interface CopyButtonProps {
  useController: typeof useCopyButtonController;
  text: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  useController,
  text,
}) => {
  const { onClick } = useController(text);

  return (
    <button
      className="rounded bg-emerald-600 py-1 px-2 font-semibold focus:outline-none"
      onClick={onClick}
    >
      <div className="flex items-center gap-1">
        <span>Copy</span>
        <DuplicateIcon className="w-5" />
      </div>
    </button>
  );
};

export const useCopyButtonController = (text: string) => {
  const onClick = () => {
    navigator.clipboard.writeText(text);
  };

  return { onClick };
};

export const useMockCopyButtonController: typeof useCopyButtonController =
  () => {
    const onClick = () => {
      console.log("Text copied to clipboard");
    };

    return { onClick };
  };

export default CopyButton;
