import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface CustomModalProps {
  useController: typeof useCustomModalController;
  open: boolean;
  hasConfim: boolean;
  hasCancel: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  useController,
  open,
  hasConfim,
  hasCancel,
  onClose,
  onConfirm,
  title,
  children,
}) => {
  const { onClick } = useController();

  return (
    <div>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={onClose}
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
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-neutral-800 bg-opacity-70 backdrop-blur" />
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-neutral-800 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-50"
                >
                  {title}
                </Dialog.Title>
                <div>{children}</div>
                <div className="mt-6 flex justify-center">
                  {hasConfim && (
                    <button
                      type="button"
                      className="inline-flex justify-center mr-4 px-4 py-2 text-sm font-medium text-white bg-emerald-400 border border-transparent rounded-md hover:bg-emerald-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={onConfirm}
                    >
                      Confirm
                    </button>
                  )}
                  {hasCancel && (
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export const useCustomModalController = () => {
  return {};
};

export const useMockCustomModalController: typeof useCustomModalController =
  () => {
    return {};
  };

export default CustomModal;
