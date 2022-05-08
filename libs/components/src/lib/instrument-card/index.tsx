import { InstrumentType } from "@prisma/client";
import React from "react";
import { CustomLineGraph } from "../../index";
interface InstrumentCardProps {
  useController: typeof useInstrumentCardController;
  instrument: {
    __typename?: "Instrument";
    id: string;
    instrumentType: InstrumentType;
    name: string;
    tickSizeMin: number;
    positionLimit: number;
    bondFixedPrice: number;
    bondVolatility: number;
  };
  color: string;
}

export const InstrumentCard: React.FC<InstrumentCardProps> = ({
  useController,
  instrument,
  color,
}) => {
  return (
    <div>
      <div className="h-48 w-full rounded-lg bg-slate-800 p-4 transition-all hover:brightness-110">
        <div className="flex h-1/2 w-full">
          <span className="mr-3">ICON</span>
          <span>
            <p className="text-lg font-bold text-gray-200 lg:text-2xl">
              ${instrument?.name.toUpperCase()}
            </p>
            <p className="text-sm text-gray-400">
              {instrument?.instrumentType}
            </p>
          </span>
        </div>
        <CustomLineGraph color={color} />
      </div>
    </div>
  );
};

export const useInstrumentCardController = () => {
  return {};
};

export const useMockInstrumentCardController: typeof useInstrumentCardController =
  () => {
    return {};
  };

export default InstrumentCard;
