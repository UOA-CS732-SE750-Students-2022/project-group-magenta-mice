import React, { useState } from "react";
import { CustomModal, useCustomModalController } from "../../..";
import { ReactComponent as CheckIcon } from "../../../../../assets/src/lib/check-icon.svg";
import { RadioGroup } from "@headlessui/react";

interface AddInstrumentsModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleAddBondInstrument: () => void;
  useController: typeof useAddInstrumentsModalController;
}

const AddInstrumentsModal: React.FC<AddInstrumentsModalProps> = ({
  isOpen,
  handleCloseModal,
  handleAddBondInstrument,
  useController,
}) => {
  const {
    allInstruments,
    newInstrumentType,
    setNewInstrumentType,
    handleAddInstrument,
  } = useController(handleAddBondInstrument);

  return (
    <CustomModal
      open={isOpen}
      hasConfirm={true}
      hasCancel={true}
      onClose={handleCloseModal}
      onConfirm={handleAddInstrument}
      title="Add Instruments"
      useController={useCustomModalController}
    >
      <div className="w-full px-4 py-16">
        <div className="mx-auto w-full max-w-md">
          <RadioGroup value={newInstrumentType} onChange={setNewInstrumentType}>
            <RadioGroup.Label className="sr-only ">Instrument</RadioGroup.Label>
            <div className="space-y-2">
              {allInstruments.map((instrument) => (
                <RadioGroup.Option
                  key={instrument.name}
                  value={instrument.name}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-emerald-300"
                        : ""
                    }
              ${
                checked
                  ? "bg-emerald-600 bg-opacity-75 text-white"
                  : "bg-gray-300"
              }
                relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md transition-all focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {instrument.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </CustomModal>
  );
};

export const useAddInstrumentsModalController = (
  handleAddBondInstrument: () => void,
) => {
  const allInstruments = [
    {
      name: "Bonds",
    },
    {
      name: "Stock (Not Yet Implemented)",
    },
    {
      name: "Future + ETF (Not Yet Implemented)",
    },
    {
      name: "ETF + Stocks (Not Yet Implemented)",
    },
    {
      name: "ADR + Stocks (Not Yet Implemented)",
    },
  ];
  const [newInstrumentType, setNewInstrumentType] = useState(
    allInstruments[0].name,
  );
  const handleAddInstrument = () => {
    handleAddBondInstrument();
    console.log("Selected Insturment: ", newInstrumentType);
  };
  return {
    allInstruments,
    newInstrumentType,
    setNewInstrumentType,
    handleAddInstrument,
  };
};

export default AddInstrumentsModal;
