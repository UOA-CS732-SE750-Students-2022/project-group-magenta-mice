import React, { useCallback, useState } from "react";
import { CustomModal, useCustomModalController } from "../../..";
import { useAddInstrumentMutation } from "@simulate-exchange/gql";
import { toast } from "react-toastify";

interface BondInstrumentModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  newBond: boolean;
  exchangeId: string;
  useController: typeof useBondInstrumentModalController;
}

const BondInstrumentModal: React.FC<BondInstrumentModalProps> = ({
  isOpen,
  handleCloseModal,
  newBond,
  exchangeId,
  useController,
}) => {
  const {
    setNewName,
    setNewTickSize,
    setNewPositionLimit,
    setNewFixedPrice,
    setNewVolatility,
    handleAddBond,
  } = useController(exchangeId, handleCloseModal);

  return (
    <CustomModal
      open={isOpen}
      hasConfirm={true}
      hasCancel={true}
      onClose={handleCloseModal}
      onConfirm={handleAddBond}
      title={newBond ? "Add Bond Instrument" : "Edit Bond Instrument"}
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
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="my-3 ">
            <label className="ml-9 ">Tick Size:</label>
            <input
              type="number"
              autoComplete="none"
              name="name"
              className="mx-4 rounded-lg bg-gray-500 p-2  outline-none  focus:ring-1 focus:ring-emerald-600 "
              onChange={(e) => setNewTickSize(e.target.value)}
            />
          </div>

          <div className="my-3">
            <label className=" ">Position Limit:</label>
            <input
              type="number"
              autoComplete="none"
              name="name"
              className="mx-4 rounded-lg bg-gray-500 p-2  outline-none  focus:ring-1 focus:ring-emerald-600 "
              onChange={(e) => setNewPositionLimit(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label className=" ml-5 ">Fixed Price:</label>
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="mx-4 rounded-lg bg-gray-500 p-2  outline-none  focus:ring-1 focus:ring-emerald-600 "
              onChange={(e) => setNewFixedPrice(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label className="ml-8 ">Volatility:</label>
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="mx-4 rounded-lg bg-gray-500 p-2 outline-none focus:ring-1 focus:ring-emerald-600  "
              onChange={(e) => setNewVolatility(e.target.value)}
            />
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export const useBondInstrumentModalController = (
  exchangeId: string,
  handleCloseModal: () => void,
) => {
  const [newName, setNewName] = useState("");
  const [newTickSize, setNewTickSize] = useState("");
  const [newPositionLimit, setNewPositionLimit] = useState("");
  const [newFixedPrice, setNewFixedPrice] = useState("");
  const [newVolatility, setNewVolatility] = useState("");

  const [addInstrument] = useAddInstrumentMutation();

  const handleAddBond = useCallback(async () => {
    try {
      const promise = addInstrument({
        variables: {
          exchangeId: exchangeId,
          instrumentType: "BOND",
          name: newName,
          positionLimit: parseInt(newPositionLimit),
          tickSize: parseInt(newTickSize),
        },
        optimisticResponse: {
          __typename: "Mutation",
          addInstrument: {
            __typename: "Instrument",
            id: Math.random.toString(),
            name: newName,
            positionLimit: parseInt(newPositionLimit),
            tickSizeMin: parseInt(newTickSize),
          },
        },
      });

      toast.promise(promise, {
        pending: "Adding Instrument...",
        success: "Successfully Added Instrument!",
        error: "Failed to create Instrument.",
      });
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  }, [
    addInstrument,
    exchangeId,
    newName,
    newPositionLimit,
    newTickSize,
    handleCloseModal,
  ]);
  return {
    setNewName,
    setNewTickSize,
    setNewPositionLimit,
    setNewFixedPrice,
    setNewVolatility,
    handleAddBond,
  };
};

export default BondInstrumentModal;
