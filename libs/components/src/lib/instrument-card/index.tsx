import { InstrumentType } from "@prisma/client";
import React, { useState } from "react";
import { CustomAreaChart } from "../../index";
import Identicon from "react-identicons";

interface InstrumentCardProps {
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
}

export const InstrumentCard: React.FC<InstrumentCardProps> = ({
  instrument,
}) => {
  const [generatedColor, setGeneratedColor] = useState("#ffffff");

  return (
    <div>
      <div className="h-48 w-full rounded-lg bg-neutral-800 p-4 transition-all hover:brightness-110">
        <div className="flex h-1/2 w-full">
          <span className="mr-3 ml-1 mt-2">
            <Identicon
              string={instrument.id}
              size={40}
              className="rounded-sm"
              getColor={(color: string) => setGeneratedColor(`#${color}`)}
            />
          </span>
          <span>
            <p className="text-lg font-bold text-gray-200 lg:text-2xl">
              ${instrument?.name.toUpperCase()}
            </p>
            <p className="text-sm text-gray-400">
              {instrument?.instrumentType}
            </p>
          </span>
        </div>
        <div className="flex h-1/2 w-full">
          <CustomAreaChart color={generatedColor} />
        </div>
      </div>
    </div>
  );
};

export default InstrumentCard;
