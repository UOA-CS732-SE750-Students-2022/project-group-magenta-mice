import React from "react";

interface InstrumentSettingsProps {
  useController: typeof useInstrumentSettingsController;
}
export const InstrumentSettings: React.FC<InstrumentSettingsProps> = ({
  useController,
}) => {
  return (
    <p className="flex items-center gap-x-4 text-4xl font-bold text-gray-50">
      Instruments
    </p>
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
