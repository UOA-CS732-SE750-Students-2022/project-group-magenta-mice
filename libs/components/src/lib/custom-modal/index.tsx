import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface CustomModalProps {
  useController: typeof useCustomModalController;
  open: boolean;
  hasConfirm: boolean;
  hasCancel: boolean;
  hasDelete?: boolean;
  onDelete?: () => void;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  useController,
  open,
  hasConfirm: hasConfim,
  hasCancel,
  hasDelete,
  onDelete,
  onClose,
  onConfirm,
  title,
  children,
}) => {
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
              <Dialog.Overlay className="fixed inset-0 bg-neutral-800 bg-opacity-70 backdrop-blur transition-opacity" />
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
              <div className="my-8 inline-block w-full max-w-md transform rounded-2xl bg-gradient-to-r from-sky-400 to-emerald-400 p-px align-middle shadow-xl transition-all">
                <div className="relative rounded-2xl bg-neutral-900 p-8">
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
                        className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-emerald-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onConfirm}
                      >
                        Confirm
                      </button>
                    )}
                    {hasDelete && (
                      <button
                        type="button"
                        className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onDelete}
                      >
                        Delete
                      </button>
                    )}
                    {hasCancel && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
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
