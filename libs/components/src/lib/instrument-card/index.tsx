import { Instrument } from "@simulate-exchange/gql";
import { useCurrency } from "@simulate-exchange/hooks";
import React, { useMemo, useState } from "react";
import Identicon from "react-identicons";
import { CustomAreaChart } from "../../index";

interface InstrumentCardProps {
  instrument: Instrument;
  instrumentPL?: number;
}

export const InstrumentCard: React.FC<InstrumentCardProps> = ({
  instrument,
  instrumentPL = 0,
}) => {
  const [generatedColor, setGeneratedColor] = useState("#ffffff");
  const profitLoss = useCurrency(instrumentPL);
  const recentTrades = useMemo(
    () => instrument.recentTrades.map((t) => t.price).reverse(),
    [instrument],
  );

  return (
    <div>
      <div className="h-48 w-full rounded-lg bg-neutral-800 p-4 transition-all hover:brightness-110">
        <div className="flex justify-between">
          <div className="flex h-1/2 w-full">
            <span className="mr-3 ml-1 mt-2">
              <Identicon
                string={instrument.name}
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
          <div className="mt-2 mr-4">
            <p className="text-xl font-bold">
              {instrumentPL >= 0 ? (
                <span className="text-green-500">+{profitLoss}</span>
              ) : (
                <span className="text-red-500">{profitLoss}</span>
              )}
            </p>
          </div>
        </div>
        <div className="flex h-1/2 w-full">
          <CustomAreaChart color={generatedColor} data={recentTrades} />
        </div>
      </div>
    </div>
  );
};

export default InstrumentCard;
