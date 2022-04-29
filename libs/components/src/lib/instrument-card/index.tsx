import React from "react";
import { useEmoji } from "@simulate-exchange/hooks";
import { ReactComponent as PlusSign } from "../../../../../libs/assets/src/lib/plus-sign.svg";

export interface InstrumentCardProps {
  useController: typeof useInstrumentCardController;
  name?: string;
  type?: string;
  isAddCard?: boolean;
  onClick: () => void;
}

export const InstrumentCard: React.FC<InstrumentCardProps> = ({
  useController,
  name,
  type,
  isAddCard,
  onClick,
}) => {
  const Arrow = useEmoji("▶", "1rem");

  if (!isAddCard) {
    return (
      <div>
        <div
          className="mb-4 h-24 w-1/2 cursor-pointer rounded-lg bg-zinc-700 p-4 transition-all hover:brightness-110"
          onClick={onClick}
        >
          <div className="flex h-full w-full justify-between px-2">
            <div className="flex h-full w-full flex-col">
              <div className="text-lg font-bold text-gray-200 lg:text-2xl">
                {name}
              </div>
              <div className="text-sm text-gray-400">{type}</div>
            </div>
            <div className="flex h-full w-full items-center justify-end gap-x-2 text-lg text-gray-400">
              Manage <Arrow />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          className="flex h-24 w-1/2 cursor-pointer items-center rounded-lg border-2 border-dashed bg-transparent transition-all hover:bg-zinc-800"
          onClick={onClick}
        >
          <PlusSign className="m-auto h-10  w-10 text-gray-50" />
        </div>
      </div>
    );
  }
};

export const useInstrumentCardController = () => {
  return {};
};

export const useMockInstrumentCardController: typeof useInstrumentCardController =
  () => {
    return {};
  };

export default InstrumentCard;
