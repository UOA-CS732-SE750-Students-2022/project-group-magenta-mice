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
  name = "",
  isAddCard,
}) => {
  const currentInstruments = [
    {
      name: "ABCD",
      type: "Bond",
    },
    {
      name: "FGGH",
      type: "Bond",
    },
    {
      name: "AAPL",
      type: "Bond",
    },
  ];

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
  const [selected, setSelected] = useState(allInstruments[0].name);
  const [isOpen, setOpen] = useState(false);
  const [openAddInstrument, setOpenAddInstrument] = useState(false);
  const [openBondInstrument, setOpenBondInstrument] = useState(false);
  const [openEditInstruments, setOpenEditInstruments] = useState(false);
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
  const handleOpenEditInstrumentsModal = () => {
    setOpen(false);
    setOpenEditInstruments(true);
  };
  const handleCloseEditInstrumentsModal = () => {
    setOpenEditInstruments(false);
  };
  const ModalCreateExchange = (
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
              autoComplete="none"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2 outline-none focus:ring-1 focus:ring-emerald-600 "
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
      title={name}
      useController={useCustomModalController}
    >
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex justify-center mr-4 px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={handleOpenEditInstrumentsModal}
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
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex justify-center mr-4 px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={handleCloseModal}
        >
          Delete Exchange
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
              {allInstruments.map((instrument) => (
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
                      : "bg-gray-300"
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none transition-all`
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
              autoComplete="none"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2  focus:ring-1  outline-none focus:ring-emerald-600 "
            />
          </div>
          <div className="my-3 ">
            <label className="ml-9 ">Tick Size:</label>
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2  focus:ring-1  outline-none focus:ring-emerald-600 "
            />
          </div>

          <div className="my-3">
            <label className=" ">Position Limit:</label>
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2  focus:ring-1  outline-none focus:ring-emerald-600 "
            />
          </div>
          <div className="my-3">
            <label className=" ml-5 ">Fixed Price:</label>
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2  focus:ring-1  outline-none focus:ring-emerald-600 "
            />
          </div>
          <div className="my-3">
            <label className="ml-8 ">Volatility:</label>
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="bg-gray-500 rounded-lg mx-4 p-2 focus:ring-1 outline-none focus:ring-emerald-600  "
            />
          </div>
        </form>
      </div>
    </CustomModal>
  );

  const ModalEditInstruments = (
    <CustomModal
      open={openEditInstruments}
      hasConfim={false}
      hasCancel={false}
      onClose={handleCloseEditInstrumentsModal}
      title="Select Instrument to Edit"
      useController={useCustomModalController}
    >
      <div className="w-full px-4 py-16">
        <div className="w-full max-w-md mx-auto">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only ">Instrument</RadioGroup.Label>
            <div className="space-y-2">
              {currentInstruments.map((instrument) => (
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
                      : "bg-gray-300"
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none transition-all`
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
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-600"
                            }`}
                          >
                            <span>{instrument.type}</span>{" "}
                          </RadioGroup.Description>
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
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="inline-flex justify-center w-20 mr-4 px-4 py-2 text-sm font-medium text-white bg-emerald-400 border border-transparent rounded-md hover:bg-emerald-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={handleCloseEditInstrumentsModal}
          >
            Edit
          </button>

          <button
            type="button"
            className="inline-flex justify-center mr-4 px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={handleCloseEditInstrumentsModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={handleCloseEditInstrumentsModal}
          >
            Delete
          </button>
        </div>
      </div>
    </CustomModal>
  );

  if (isAddCard) {
    return (
      <div>
        {ModalCreateExchange}
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
        {ModalEditInstruments}
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
