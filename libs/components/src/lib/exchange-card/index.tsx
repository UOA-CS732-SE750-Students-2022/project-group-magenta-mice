import React, { useState } from "react";
import { ReactComponent as PlusSign } from "../../../../../libs/assets/src/lib/plus-sign.svg";
import { ReactComponent as CheckIcon } from "../../../../../libs/assets/src/lib/check-icon.svg";
import { Combobox, RadioGroup } from "@headlessui/react";
import cx from "classnames";

import {
  CustomModal,
  useCustomModalController,
  ColourSelect,
  useColourSelectController,
} from "../..";

interface ExchangeCardProps {
  name?: string;
  colour?: string;
  isAddCard: boolean;
}

export const ExchangeCard: React.FC<ExchangeCardProps> = ({
  name = "",
  colour = "bg-gray-600",
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
      <div className="mx-8 mt-4">
        <form className="">
          <label className="mr-4 flex flex-col gap-y-2 text-left text-gray-50">
            Name:
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="rounded-lg bg-gray-500  p-2 outline-none focus:ring-1 focus:ring-emerald-600 "
              onChange={(e) => setNewExchangeName(e.target.value)}
            />
          </label>
          <div className="flex flex-col pb-2 text-left">
            <label className="float-left mt-8 mb-2 text-gray-50">Colour:</label>
            <ColourSelect useController={useColourSelectController} />
          </div>
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
        <div className="mx-auto w-full max-w-md">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only ">Instrument</RadioGroup.Label>
            <div className="space-y-2">
              {allInstruments.map((instrument) => (
                <RadioGroup.Option
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
              className="mx-4 rounded-lg bg-gray-500 p-2  outline-none  focus:ring-1 focus:ring-emerald-600 "
            />
          </div>
          <div className="my-3 ">
            <label className="ml-9 ">Tick Size:</label>
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="mx-4 rounded-lg bg-gray-500 p-2  outline-none  focus:ring-1 focus:ring-emerald-600 "
            />
          </div>

          <div className="my-3">
            <label className=" ">Position Limit:</label>
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="mx-4 rounded-lg bg-gray-500 p-2  outline-none  focus:ring-1 focus:ring-emerald-600 "
            />
          </div>
          <div className="my-3">
            <label className=" ml-5 ">Fixed Price:</label>
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="mx-4 rounded-lg bg-gray-500 p-2  outline-none  focus:ring-1 focus:ring-emerald-600 "
            />
          </div>
          <div className="my-3">
            <label className="ml-8 ">Volatility:</label>
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="mx-4 rounded-lg bg-gray-500 p-2 outline-none focus:ring-1 focus:ring-emerald-600  "
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
        <div className="mx-auto w-full max-w-md">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only ">Instrument</RadioGroup.Label>
            <div className="space-y-2">
              {currentInstruments.map((instrument) => (
                <RadioGroup.Option
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
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="mr-4 inline-flex w-20 justify-center rounded-md border border-transparent bg-emerald-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={handleCloseEditInstrumentsModal}
          >
            Edit
          </button>

          <button
            type="button"
            className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={handleCloseEditInstrumentsModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
          className={cx(
            colour,
            "h-44 w-full cursor-pointer rounded-lg p-4 text-2xl font-semibold text-gray-200 transition-all hover:brightness-110",
          )}
          onClick={handleOpenModal}
        >
          <PlusSign className="h-12 w-12" />
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
          className={cx(
            colour,
            "h-44 w-full cursor-pointer rounded-lg p-4 text-2xl font-semibold text-gray-200  transition-all hover:brightness-110",
          )}
          onClick={handleOpenModal}
        >
          {name}
        </div>
      </div>
    );
  }
};

export default ExchangeCard;
