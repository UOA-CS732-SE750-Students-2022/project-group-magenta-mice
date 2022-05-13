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
    <div className="flex w-full justify-between rounded-lg border p-4 dark:border-black dark:bg-neutral-800 2xl:p-6">
      <div className="hidden w-56 gap-4 2xl:flex">
        <Identicon
          string={instrument.name}
          size={145}
          className="rounded border dark:border-black"
          getColor={(color: string) => setGeneratedColor(`#${color}`)}
        />
        <div className="flex flex-col justify-between gap-2 font-semibold">
          <span className="text-xl">${instrument?.name.toUpperCase()}</span>

          <div className="flex flex-col gap-2">
            <span>Type: {instrument?.instrumentType}</span>
            <div>
              {instrumentPL >= 0 ? (
                <span className="text-green-500">P/L: +{profitLoss}</span>
              ) : (
                <span className="text-red-500">P/L: {profitLoss}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-40 gap-2 2xl:hidden">
        <Identicon
          string={instrument.name}
          size={100}
          className="rounded border dark:border-black"
          getColor={(color: string) => setGeneratedColor(`#${color}`)}
        />
        <div className="flex flex-col justify-between text-sm font-semibold md:text-base">
          <span className="">${instrument?.name.toUpperCase()}</span>

          <div className="flex flex-col">
            <span>{instrument?.instrumentType}</span>
            <div>
              {instrumentPL >= 0 ? (
                <span className="text-green-500">{profitLoss}</span>
              ) : (
                <span className="text-red-500">{profitLoss}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="ml-4 flex h-24 w-full xl:ml-12">
        {recentTrades.length ? (
          <CustomAreaChart color={generatedColor} data={recentTrades} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            No trades yet!
          </div>
        )}
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div className="h-48 w-full rounded-lg dark:bg-neutral-800 border p-4 transition-all hover:brightness-110">
  //       <div className="flex justify-between">
  //         <div className="flex h-1/2 w-full">
  //           <span className="mr-3 ml-1 mt-2">
  //             <Identicon
  //               string={instrument.name}
  //               size={40}
  //               className="rounded-sm"
  //               getColor={(color: string) => setGeneratedColor(`#${color}`)}
  //             />
  //           </span>
  //           <span>
  //             <p className="text-lg font-bold text-gray-200 lg:text-2xl">
  //               ${instrument?.name.toUpperCase()}
  //             </p>
  //             <p className="text-sm text-gray-400">
  //               {instrument?.instrumentType}
  //             </p>
  //           </span>
  //         </div>
  //         <div className="mt-2 mr-4">
  //           <p className="text-xl font-bold">
  //             {instrumentPL >= 0 ? (
  //               <span className="text-green-500">+{profitLoss}</span>
  //             ) : (
  //               <span className="text-red-500">{profitLoss}</span>
  //             )}
  //           </p>
  //         </div>
  //       </div>
  //       <div className="flex h-1/2 w-full">
  //         <CustomAreaChart color={generatedColor} data={recentTrades} />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default InstrumentCard;
