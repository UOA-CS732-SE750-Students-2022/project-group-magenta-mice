import React, { useState } from "react";
import { ReactComponent as PlusSign } from "../../../../../libs/assets/src/lib/plus-sign.svg";
import { ReactComponent as ChevronRight } from "../../../../../libs/assets/src/lib/chevron-right.svg";
import BondInstrumentModal, {
  useBondInstrumentModalController,
} from "../exchange-settings/instruments/BondInstrumentModal";

export interface InstrumentCardProps {
  useController: typeof useInstrumentCardController;
  exchangeId: string;
  instrument?: {
    __typename?: "Instrument";
    id: string;
    name: string;
    tickSizeMin: number;
    positionLimit: number;
    bondFixedPrice: number;
    bondVolatility: number;
  };
  type?: string;
  isAddCard?: boolean;
  onClick?: () => void;
}

export const InstrumentCard: React.FC<InstrumentCardProps> = ({
  useController,
  exchangeId,
  instrument,
  type,
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
      <div>
        {modalEditBondInstruments}
        <div
          className="mb-4 h-24 w-1/2 cursor-pointer rounded-lg bg-zinc-700 p-4 transition-all hover:brightness-110"
          onClick={handleOpenEditBondInstrumentModal}
        >
          <div className="flex h-full w-full justify-between px-2">
            <div className="flex h-full w-full flex-col">
              <div className="text-lg font-bold text-gray-200 lg:text-2xl">
                ${instrument?.name.toUpperCase()}
              </div>
              <div className="text-sm text-gray-400">{type}</div>
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
