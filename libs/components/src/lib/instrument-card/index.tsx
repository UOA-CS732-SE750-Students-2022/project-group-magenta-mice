import React from "react";

interface InstrumentCardProps {
  useController: typeof useInstrumentCardController;
}

export const InstrumentCard: React.FC<InstrumentCardProps> = ({
  useController,
}) => {
  return <div></div>;
};

export const useInstrumentCardController = () => {
  return {};
};

export const useMockInstrumentCardController: typeof useInstrumentCardController =
  () => {
    return {};
  };

export default InstrumentCard;
