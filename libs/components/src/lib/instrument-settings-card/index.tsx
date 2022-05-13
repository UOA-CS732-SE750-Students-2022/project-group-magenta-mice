import React, { useState } from "react";
import { ReactComponent as PlusSign } from "../../../../../libs/assets/src/lib/plus-sign.svg";
import { ReactComponent as ChevronRight } from "../../../../../libs/assets/src/lib/chevron-right.svg";
import BondInstrumentModal, {
  useBondInstrumentModalController,
} from "../exchange-settings/instruments/BondInstrumentModal";
import { InstrumentType } from "@prisma/client";

export interface InstrumentSettingsCardProps {
  useController: typeof useInstrumentSettingsCardController;
  exchangeId: string;
  instrument?: {
    __typename?: "Instrument";
    id: string;
    instrumentType: InstrumentType;
    name: string;
    tickSizeMin: number;
    positionLimit: number;
    bondFixedPrice: number;
    bondVolatility: number;
  };
  isAddCard?: boolean;
  onClick?: () => void;
}

export const InstrumentSettingsCard: React.FC<InstrumentSettingsCardProps> = ({
  useController,
  exchangeId,
  instrument,
  isAddCard,
  onClick,
}) => {
  const [isEditBondInstrumentsModalOpen, setIsEditBondInstrumentsModalOpen] =
    useState(false);

  const handleOpenEditBondInstrumentModal = () => {
    setIsEditBondInstrumentsModalOpen(true);
  };

  const handleCloseEditBondInstrumentModal = () => {
    setIsEditBondInstrumentsModalOpen(false);
  };

  const modalEditBondInstruments = (
    <BondInstrumentModal
      isOpen={isEditBondInstrumentsModalOpen}
      handleCloseModal={handleCloseEditBondInstrumentModal}
      newBond={false}
      exchangeId={exchangeId}
      instrument={instrument}
      useController={useBondInstrumentModalController}
    />
  );

  if (!isAddCard) {
    return (
      <div className="w-full">
        {modalEditBondInstruments}
        <div
          className="h-24 w-full cursor-pointer rounded-lg border p-4 transition-all hover:brightness-75 dark:border-0 dark:bg-neutral-800 dark:hover:brightness-110"
          onClick={handleOpenEditBondInstrumentModal}
        >
          <div className="flex h-full w-full justify-between px-2">
            <div className="flex h-full w-full flex-col">
              <div className="text-lg font-bold text-gray-600 dark:text-gray-200 lg:text-2xl">
                ${instrument?.name.toUpperCase()}
              </div>
              <div className="text-sm text-gray-400">
                {instrument?.instrumentType}
              </div>
            </div>
            <div className="flex h-full w-full items-center justify-end gap-x-2 text-lg text-gray-400">
              Manage <ChevronRight />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <div
          className="flex h-24 w-full cursor-pointer items-center rounded-lg border-2 border-dashed bg-transparent text-gray-600 transition-all hover:bg-blue-400 hover:text-white dark:border-inherit dark:hover:bg-zinc-800"
          onClick={onClick}
        >
          <PlusSign className="m-auto h-10 w-10 dark:text-gray-50 " />
        </div>
      </div>
    );
  }
};

export const useInstrumentSettingsCardController = () => {
  return {};
};

export default InstrumentSettingsCard;
