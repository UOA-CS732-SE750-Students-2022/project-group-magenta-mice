import React, { useCallback, useState } from "react";
import { CustomModal, useCustomModalController } from "../../..";
import {
  useAddInstrumentMutation,
  useEditInstrumentMutation,
  useDeleteInstrumentMutation,
} from "@simulate-exchange/gql";
import { toast } from "react-toastify";

interface BondInstrumentModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  newBond: boolean;
  exchangeId: string;
  instrument?: {
    __typename?: "Instrument";
    id: string;
    name: string;
    tickSizeMin: number;
    positionLimit: number;
    bondFixedPrice: number;
    bondVolatility: number;
  };
  useController: typeof useBondInstrumentModalController;
}

const BondInstrumentModal: React.FC<BondInstrumentModalProps> = ({
  isOpen,
  handleCloseModal,
  newBond,
  instrument,
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
    handleEditBond,
  } = useController(
    exchangeId,
    handleCloseModal,
    instrument ? instrument.id : Math.random.toString(),
    instrument,
  );

  const [deleteInstrument] = useDeleteInstrumentMutation();

  const handleDeleteInstrument = useCallback(async () => {
    try {
      const promise = deleteInstrument({
        variables: {
          id: instrument ? instrument.id : Math.random.toString(),
        },
      });
      toast.promise(promise, {
        pending: "Deleting Instrument...",
        success: "Successfully Deleted Instrument!",
        error: "Failed to Delete Instrument.",
      });
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  }, [deleteInstrument, handleCloseModal, instrument]);

  return (
    <CustomModal
      open={isOpen}
      hasConfirm={true}
      hasCancel={true}
      hasDelete={newBond ? false : true}
      onDelete={handleDeleteInstrument}
      onClose={handleCloseModal}
      onConfirm={newBond ? handleAddBond : handleEditBond}
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
              defaultValue={instrument?.name}
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
              defaultValue={instrument?.tickSizeMin}
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
              defaultValue={instrument?.positionLimit}
            />
          </div>
          <div className="my-3">
            <label className=" ml-5 ">Fixed Price:</label>
            <input
              type="number"
              autoComplete="none"
              name="name"
              className="mx-4 rounded-lg bg-gray-500 p-2  outline-none  focus:ring-1 focus:ring-emerald-600 "
              onChange={(e) => setNewFixedPrice(e.target.value)}
              defaultValue={instrument?.bondFixedPrice}
            />
          </div>
          <div className="my-3">
            <label className="ml-8 ">Volatility:</label>
            <input
              type="number"
              autoComplete="none"
              name="name"
              className="mx-4 rounded-lg bg-gray-500 p-2 outline-none focus:ring-1 focus:ring-emerald-600  "
              onChange={(e) => setNewVolatility(e.target.value)}
              defaultValue={instrument?.bondVolatility}
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
  instrumentId: string,
  instrument?: {
    __typename?: "Instrument";
    id: string;
    name: string;
    tickSizeMin: number;
    positionLimit: number;
    bondFixedPrice: number;
    bondVolatility: number;
  },
) => {
  const [newName, setNewName] = useState(instrument?.name || "");
  const [newTickSize, setNewTickSize] = useState(
    instrument?.tickSizeMin.toString() || "",
  );
  const [newPositionLimit, setNewPositionLimit] = useState(
    instrument?.positionLimit.toString() || "",
  );
  const [newFixedPrice, setNewFixedPrice] = useState(
    instrument?.bondFixedPrice.toString() || "",
  );
  const [newVolatility, setNewVolatility] = useState(
    instrument?.bondVolatility.toString() || "",
  );

  const [addInstrument] = useAddInstrumentMutation();
  const [editInstrument] = useEditInstrumentMutation();

  const handleAddBond = useCallback(async () => {
    try {
      const promise = addInstrument({
        variables: {
          exchangeId: exchangeId,
          instrumentType: "BOND",
          name: newName,
          positionLimit: parseInt(newPositionLimit),
          tickSize: parseInt(newTickSize),
          bondFixedPrice: parseInt(newFixedPrice),
          bondVolatility: parseInt(newVolatility),
        },
        optimisticResponse: {
          __typename: "Mutation",
          addInstrument: {
            __typename: "Instrument",
            id: instrumentId,
            name: newName,
            positionLimit: parseInt(newPositionLimit),
            tickSizeMin: parseInt(newTickSize),
            bondFixedPrice: parseInt(newFixedPrice),
            bondVolatility: parseInt(newVolatility),
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
    newFixedPrice,
    newVolatility,
    instrumentId,
    handleCloseModal,
  ]);

  const handleEditBond = useCallback(async () => {
    try {
      const promise = editInstrument({
        variables: {
          exchangeId: exchangeId,
          instrumentId: instrumentId,
          instrumentType: "BOND",
          name: newName,
          positionLimit: parseInt(newPositionLimit),
          tickSize: parseInt(newTickSize),
          bondFixedPrice: parseInt(newFixedPrice),
          bondVolatility: parseInt(newVolatility),
        },
        optimisticResponse: {
          __typename: "Mutation",
          editInstrument: {
            __typename: "Instrument",
            id: instrumentId,
            name: newName,
            positionLimit: parseInt(newPositionLimit),
            tickSizeMin: parseInt(newTickSize),
            bondFixedPrice: parseInt(newFixedPrice),
            bondVolatility: parseInt(newVolatility),
          },
        },
      });

      toast.promise(promise, {
        pending: "Editing Instrument...",
        success: "Successfully Edited Instrument!",
        error: "Failed to Edit Instrument.",
      });
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  }, [
    editInstrument,
    exchangeId,
    instrumentId,
    newName,
    newPositionLimit,
    newTickSize,
    newFixedPrice,
    newVolatility,
    handleCloseModal,
  ]);

  return {
    setNewName,
    setNewTickSize,
    setNewPositionLimit,
    setNewFixedPrice,
    setNewVolatility,
    handleAddBond,
    handleEditBond,
  };
};

export default BondInstrumentModal;
