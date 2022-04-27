import React, { useState } from "react";
import { CustomModal, useCustomModalController } from "../../..";

interface BondInstrumentModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  useController: typeof useBondInstrumentModalController;
}

const BondInstrumentModal: React.FC<BondInstrumentModalProps> = ({
  isOpen,
  handleCloseModal,
  useController,
}) => {
  const {
    setNewName,
    setNewTickSize,
    setNewPositionLimit,
    setNewFixedPrice,
    setNewVolatility,
    handleAddBond,
  } = useController();

  return (
    <CustomModal
      open={isOpen}
      hasConfirm={true}
      hasCancel={true}
      onClose={handleCloseModal}
      onConfirm={handleAddBond}
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
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="my-3 ">
            <label className="ml-9 ">Tick Size:</label>
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="mx-4 rounded-lg bg-gray-500 p-2  outline-none  focus:ring-1 focus:ring-emerald-600 "
              onChange={(e) => setNewTickSize(e.target.value)}
            />
          </div>

          <div className="my-3">
            <label className=" ">Position Limit:</label>
            <input
              type="text"
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

export const useBondInstrumentModalController = () => {
  const [newName, setNewName] = useState("");
  const [newTickSize, setNewTickSize] = useState("");
  const [newPositionLimit, setNewPositionLimit] = useState("");
  const [newFixedPrice, setNewFixedPrice] = useState("");
  const [newVolatility, setNewVolatility] = useState("");

  const handleAddBond = () => {
    console.log(
      "add bond: ",
      newName,
      newTickSize,
      newPositionLimit,
      newFixedPrice,
      newVolatility,
    );
  };
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
