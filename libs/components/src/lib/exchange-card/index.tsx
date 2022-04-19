import React, { useState, Fragment } from "react";
import { ReactComponent as PlusSign } from "../../../../../libs/assets/src/lib/plus-sign.svg";
import { ReactComponent as CheckIcon } from "../../../../../libs/assets/src/lib/check-icon.svg";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";

interface ExchangeCardProps {
  name?: string;
  isAddCard: boolean;
}

export const ExchangeCard: React.FC<ExchangeCardProps> = ({
  name,
  isAddCard,
}) => {
  const [isOpen, setOpen] = useState(false);

  const instruments = [
    {
      name: "Bonds",
    },
    {
      name: "Stock",
    },
    {
      name: "Future + ETF",
    },
    {
      name: "ETF + Stocks",
    },
    {
      name: "ADR + Stocks",
    },
  ];
  const [selected, setSelected] = useState(instruments[0].name);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  if (isAddCard) {
    return (
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={handleCloseModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create An Exchange
                  </Dialog.Title>
                  <div className="mt-6">
                    <form className="">
                      <label className="mr-4">
                        Name:
                        <input
                          type="text"
                          name="name"
                          className="bg-gray-200 rounded-lg mx-4 p-2"
                        />
                      </label>
                    </form>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center mr-4 px-4 py-2 text-sm font-medium text-white bg-emerald-400 border border-transparent rounded-md hover:bg-emerald-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={handleCloseModal}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
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
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={handleCloseModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Instruments
                  </Dialog.Title>
                  <div className="w-full px-4 py-16">
                    <div className="w-full max-w-md mx-auto">
                      <RadioGroup value={selected} onChange={setSelected}>
                        <RadioGroup.Label className="sr-only ">
                          Instrument
                        </RadioGroup.Label>
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
                      : "bg-emerald-100"
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
                                          checked
                                            ? "text-white"
                                            : "text-gray-900"
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

                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center mr-4 px-4 py-2 text-sm font-medium text-white bg-emerald-400 border border-transparent rounded-md hover:bg-emerald-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={handleCloseModal}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        <div
          className="w-80 h-44 mt-5 ml-10 p-4 rounded-lg bg-emerald-800 text-gray-300 cursor-pointer hover:bg-emerald-700 text-2xl"
          onClick={handleOpenModal}
        >
          {name}
        </div>
      </div>
    );
  }
};

export default ExchangeCard;
