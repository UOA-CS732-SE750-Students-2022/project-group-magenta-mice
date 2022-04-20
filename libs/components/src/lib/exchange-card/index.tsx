import React, { useState } from "react";
import { ReactComponent as PlusSign } from "../../../../../libs/assets/src/lib/plus-sign.svg";
import { ReactComponent as CheckIcon } from "../../../../../libs/assets/src/lib/check-icon.svg";
import { RadioGroup } from "@headlessui/react";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  CustomModal,
  useCustomModalController,
} from "@simulate-exchange/components";

interface ExchangeCardProps {
  name?: string;
  isAddCard: boolean;
}

export const ExchangeCard: React.FC<ExchangeCardProps> = ({
  name,
  isAddCard,
}) => {
  const instruments = [
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
  const [selected, setSelected] = useState(instruments[0].name);
  const [isOpen, setOpen] = useState(false);
  const [openAddInstrument, setOpenAddInstrument] = useState(false);
  const [openBondInstrument, setOpenBondInstrument] = useState(false);
  const [newExchangeName, setNewExchangeName] = useState("");

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenAddInstrumentModal = () => {
    setOpen(false);
    setOpenAddInstrument(true);
  };
  const handleCloseAddInstrumentModal = () => {
    setOpenAddInstrument(false);
  };
  const handleOpenBondInstrumentModal = () => {
    setOpenAddInstrument(false);
    setOpenBondInstrument(true);
  };
  const handleCloseBondInstrumentModal = () => {
    setOpenBondInstrument(false);
  };

  const ModalAddExchange = (
    <CustomModal
      open={isOpen}
      hasConfim={true}
      hasCancel={true}
      onClose={handleCloseModal}
      onConfirm={handleCloseModal}
      title="Create An Exchange"
      useController={useCustomModalController}
    >
      <div className="mt-6">
        <form className="">
          <label className="mr-4 text-gray-50">
            Name:
            <input
              type="text"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2"
              onChange={(e) => setNewExchangeName(e.target.value)}
            />
          </label>
        </form>
      </div>
    </CustomModal>
  );

  const ModalEditExchange = (
    <CustomModal
      open={isOpen}
      hasConfim={false}
      hasCancel={false}
      onClose={handleCloseModal}
      onConfirm={handleCloseModal}
      title="Edit Exchange"
      useController={useCustomModalController}
    >
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex justify-center mr-4 px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={handleCloseModal}
        >
          Edit Instruments
        </button>
        <button
          type="button"
          className="inline-flex justify-center mr-4 px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={handleOpenAddInstrumentModal}
        >
          Add Instruments
        </button>
      </div>
    </CustomModal>
  );

  const ModalAddInsturment = (
    <CustomModal
      open={openAddInstrument}
      hasConfim={true}
      hasCancel={true}
      onClose={handleCloseAddInstrumentModal}
      onConfirm={handleOpenBondInstrumentModal}
      title="Add Instruments"
      useController={useCustomModalController}
    >
      <div className="w-full px-4 py-16">
        <div className="w-full max-w-md mx-auto">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only ">Instrument</RadioGroup.Label>
            <div className="space-y-2">
              {instruments.map((instrument) => (
                <RadioGroup.Option
                  value={instrument.name}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-offset-2 ring-offset-emerald-300 ring-white ring-opacity-60"
                        : ""
                    }
                  ${
                    checked
                      ? "bg-emerald-600 bg-opacity-75 text-white"
                      : "bg-gray-500"
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <div className="flex items-center justify-between w-full">
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
                          <CheckIcon className="w-6 h-6" />
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

  const ModalBondsInstrument = (
    <CustomModal
      open={openBondInstrument}
      hasConfim={true}
      hasCancel={true}
      onClose={handleCloseBondInstrumentModal}
      onConfirm={handleCloseBondInstrumentModal}
      title="Add a Bond"
      useController={useCustomModalController}
    >
      <div className="mt-6">
        <form className="flex flex-col text-gray-100">
          <div className=" my-3">
            <label className=" ">Name (Ticker):</label>
            <input
              type="text"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2"
            />
          </div>
          <div className="my-3 ">
            <label className="ml-9 ">Tick Size:</label>
            <input
              type="text"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2"
            />
          </div>

          <div className="my-3">
            <label className=" ">Position Limit:</label>
            <input
              type="text"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2"
            />
          </div>
          <div className="my-3">
            <label className=" ml-5 ">Fixed Price:</label>
            <input
              type="text"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2"
            />
          </div>
          <div className="my-3">
            <label className="ml-8 ">Volatility:</label>
            <input
              type="text"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2"
            />
          </div>
        </form>
      </div>
    </CustomModal>
  );

  if (isAddCard) {
    return (
      <div>
        {ModalAddExchange}
        <div
          className="w-80 h-44 mt-5 ml-10 p-4 rounded-lg bg-emerald-800 text-gray-300 cursor-pointer hover:bg-emerald-700 transition-colors text-2xl"
          onClick={handleOpenModal}
        >
          <PlusSign className="w-12 h-12" />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {ModalEditExchange}
        {ModalAddInsturment}
        {ModalBondsInstrument}
        <div
          className="w-80 h-44 mt-5 ml-10 p-4 rounded-lg bg-emerald-800 text-gray-300 cursor-pointer hover:bg-emerald-700 transition-colors text-2xl"
          onClick={handleOpenModal}
        >
          {name}
        </div>
      </div>
    );
  }
};

export default ExchangeCard;
