import { InstrumentType } from "@prisma/client";
import React, { useState } from "react";
import { InstrumentCard, useInstrumentCardController } from "../../../index";
import AddInstrumentsModal, {
  useAddInstrumentsModalController,
} from "./AddInstrumentsModal";
import BondInstrumentModal, {
  useBondInstrumentModalController,
} from "./BondInstrumentModal";

interface InstrumentSettingsProps {
  useController: typeof useInstrumentSettingsController;
  exchangeId: string;
  instruments: {
    __typename?: "Instrument";
    id: string;
    instrumentType: InstrumentType;
    name: string;
    tickSizeMin: number;
    positionLimit: number;
    bondFixedPrice: number;
    bondVolatility: number;
  }[];
}
export const InstrumentSettings: React.FC<InstrumentSettingsProps> = ({
  useController,
  instruments,
  exchangeId,
}) => {
  const [isAddInstrumentModalOpen, setIsAddInstrumentModalOpen] =
    useState(false);
  const [isBondInstrumentsModalOpen, setIsBondInstrumentsModalOpen] =
    useState(false);

  const handleOpenAddInstrumentModal = () => {
    setIsAddInstrumentModalOpen(true);
  };

  const handleCloseAddInstrumentModal = () => {
    setIsAddInstrumentModalOpen(false);
  };

  const handleOpenBondInstrumentModal = () => {
    setIsAddInstrumentModalOpen(false);
    setIsBondInstrumentsModalOpen(true);
  };

  const handleCloseBondInstrumentModal = () => {
    setIsBondInstrumentsModalOpen(false);
  };

  const modalAddInstruments = (
    <AddInstrumentsModal
      isOpen={isAddInstrumentModalOpen}
      handleCloseModal={handleCloseAddInstrumentModal}
      handleAddBondInstrument={handleOpenBondInstrumentModal}
      useController={useAddInstrumentsModalController}
    />
  );

  const modalBondInstruments = (
    <BondInstrumentModal
      isOpen={isBondInstrumentsModalOpen}
      handleCloseModal={handleCloseBondInstrumentModal}
      newBond={true}
      exchangeId={exchangeId}
      useController={useBondInstrumentModalController}
    />
  );

  return (
    <>
      {modalAddInstruments}
      {modalBondInstruments}
      <p className="mb-4 flex items-center gap-x-4 text-4xl font-bold text-gray-50">
        Instruments
      </p>
      {instruments.length < 5 && (
        <p className="mb-4 text-lg text-gray-400">
          {instruments.length === 5}
          {5 - instruments.length} instrument
          {5 - instruments.length > 1 ? "s" : ""} available
        </p>
      )}

      <div>
        {instruments.map((instrument) => (
          <InstrumentCard
            useController={useInstrumentCardController}
            instrument={instrument}
            exchangeId={exchangeId}
          />
        ))}
      </div>
      {instruments.length < 5 && (
        <div>
          <InstrumentCard
            useController={useInstrumentCardController}
            exchangeId={exchangeId}
            isAddCard={true}
            onClick={handleOpenAddInstrumentModal}
          />
        </div>
      )}
    </>
  );
};

export const useInstrumentSettingsController = () => {
  return {};
};

export const useMockInstrumentSettingsController: typeof useInstrumentSettingsController =
  () => {
    return {};
  };

export default InstrumentSettings;
