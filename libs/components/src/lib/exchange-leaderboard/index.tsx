import classnames from "classnames";
import React from "react";

export interface Score {
  imageUrl: string;
  name: string;
  profitLoss: number;
}

export interface ExchangeLeaderboardProps {
  topUsers?: Score[];
}

export const ExchangeLeaderboard: React.FC<ExchangeLeaderboardProps> = ({
  topUsers,
}) => {
  if (!topUsers) {
    return null;
  }

  const formatted = topUsers
    .map((score) => ({
      score: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(score.profitLoss),
      positive: score.profitLoss >= 0,
      ...score,
    }))
    .sort((a, b) => b.profitLoss - a.profitLoss);

  return (
    <div className="flex h-full flex-col gap-2">
      {formatted.map((user, index) => (
        <div
          key={index}
          className="flex w-full items-center justify-between rounded-lg border p-2 dark:border-black dark:bg-neutral-800"
        >
          <div className="flex items-center gap-2">
            <img
              className="w-8 rounded-full shadow"
              src={user.imageUrl}
              alt="User avatar"
            />
            <span className="font-semibold">{user.name}</span>
          </div>
          <span
            className={classnames("font-bold ", {
              "text-green-600": user.positive,
              "text-red-600": !user.positive,
            })}
          >
            {user.score}
          </span>
        </div>
      ))}
    </div>
  );

  // return (
  //   <div className="flex">
  //     <div className="z-10 flex flex-col items-center justify-center rounded bg-emerald-500 px-20 py-16 shadow-xl">
  //       <h1 className="mb-12 text-2xl uppercase text-white">
  //         <span className="font-bold">{"Best "}</span>
  //         <span className="font-light">{"Trader"}</span>
  //       </h1>
  //       <div className="relative">
  //         <img
  //           className="w-24 rounded-full shadow-lg"
  //           src={best.imageUrl}
  //           alt="User avatar"
  //         />
  //         <div className="absolute bottom-0 left-3/4 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 shadow-[0_0_15px_2px] shadow-rose-500">
  //           <span className="text-lg font-bold text-white">1</span>
  //         </div>
  //       </div>
  //       <h2 className="mb-10 mt-2 text-lg font-semibold text-white">
  //         {best.name}
  //       </h2>
  //       <h2 className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 bg-clip-text text-3xl font-extrabold text-transparent">
  //         {best.score}
  //       </h2>
  //     </div>
  //     <div className="my-8 h-auto">
  //       <div className="flex h-full flex-col justify-between rounded-r-md bg-neutral-800 px-8 py-8 shadow-lg">
  //         {rest.slice(0, 3).map((score, index) => (
  //           <div className="flex items-center justify-between gap-x-16">
  //             <div className="flex items-center gap-x-8">
  //               <div className="relative">
  //                 <img
  //                   className="w-16 rounded-full shadow-lg"
  //                   src={score.imageUrl}
  //                   alt="User avatar"
  //                 />
  //                 <div className="absolute bottom-0 left-3/4 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 shadow-[0_0_15px_2px] shadow-rose-500">
  //                   <span className="text-base font-bold text-white">
  //                     {index + 2}
  //                   </span>
  //                 </div>
  //               </div>
  //               <div className="font-bold text-gray-400">{score.name}</div>
  //             </div>
  //             <div
  //               className={classnames("font-bold ", {
  //                 "text-green-600": score.positive,
  //                 "text-red-600": !score.positive,
  //               })}
  //             >
  //               {rest[index].score}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
};
