import React from "react";
import { InstrumentCard, useInstrumentCardController } from "../../../index";

interface InstrumentSettingsProps {
  useController: typeof useInstrumentSettingsController;
  instruments: { name: string; type: string }[];
}
export const InstrumentSettings: React.FC<InstrumentSettingsProps> = ({
  useController,
  instruments,
}) => {
  return (
    <>
      <p className="mb-4 flex items-center gap-x-4 text-4xl font-bold text-gray-50">
        Instruments
      </p>
      {instruments.length < 5 && (
        <p className="mb-4 text-lg text-gray-400">
          {instruments.length === 5}
          {5 - instruments.length} instrument
          {5 - instruments.length > 1 ? "s" : ""} available
        </p>
      )}

      <div>
        {instruments.map((instrument) => (
          <InstrumentCard
            useController={useInstrumentCardController}
            name={instrument.name}
            type={instrument.type}
          />
        ))}
      </div>
      {instruments.length < 5 && (
        <div>
          <InstrumentCard
            useController={useInstrumentCardController}
            isAddCard={true}
          />
        </div>
      )}
    </>
  );
};

export const useInstrumentSettingsController = () => {
  return {};
};

export const useMockInstrumentSettingsController: typeof useInstrumentSettingsController =
  () => {
    return {};
  };

export default InstrumentSettings;
