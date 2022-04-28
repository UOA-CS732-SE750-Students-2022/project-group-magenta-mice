import React from "react";
import { CustomModal, useCustomModalController } from "../..";

interface EditExchangeModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  name: string;
  handleOpenEditInstrumentsModal: () => void;
  handleOpenAddInstrumentModal: () => void;
}

const EditExchangeModal: React.FC<EditExchangeModalProps> = ({
  handleOpenAddInstrumentModal,
  handleOpenEditInstrumentsModal,
  isOpen,
  name,
  handleCloseModal,
}) => {
  return (
    <CustomModal
      open={isOpen}
      hasConfirm={false}
      hasCancel={false}
      onClose={handleCloseModal}
      onConfirm={handleCloseModal}
      title={name}
      useController={useCustomModalController}
    >
      <div className="mt-6">
        <button
          type="button"
          className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={handleOpenEditInstrumentsModal}
        >
          Edit Instruments
        </button>
        <button
          type="button"
          className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={handleOpenAddInstrumentModal}
        >
          Add Instruments
        </button>
      </div>
      <div className="mt-6">
        <button
          type="button"
          className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={handleCloseModal}
        >
          Delete Exchange
        </button>
      </div>
    </CustomModal>
  );
};

export default EditExchangeModal;
