import React, { FC } from "react";
import cx from "classnames";

interface SidebarProps {
  useController: typeof useSidebarController;
  setPage: (page: string) => void;
  options: { page: string; emoji: FC<{ className?: string }> }[];
  currentPage: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  useController,
  setPage,
  options,
  currentPage,
}) => {
  return (
    <div className="mt-8 flex flex-col divide-y divide-neutral-900 rounded bg-neutral-800 text-white lg:gap-2 lg:divide-y-0 lg:px-1 lg:pb-1 2xl:ml-8">
      <div className="hidden items-center justify-center pb-6 pt-5 text-xl font-bold lg:flex">
        Navigation
      </div>

      {options.map((option) => (
        <div
          key={option.page}
          className={cx(
            "flex flex-col items-center justify-center",
            currentPage === option.page && "rounded bg-neutral-700",
          )}
          onClick={() => setPage(option.page)}
        >
          <button className="flex w-full items-center justify-between gap-x-6 rounded py-3 px-4 font-semibold transition-all hover:bg-neutral-700">
            <div className="text-md">{option.page}</div>
            <div className="">{<option.emoji />}</div>
          </button>
        </div>
      ))}
    </div>
  );
};

export const useSidebarController = () => {
  return {};
};

export const useMockSidebarController: typeof useSidebarController = () => {
  return {};
};

export default Sidebar;

{
  /* <button
        className="flex items-center gap-x-6 py-6 pl-8 pr-20 font-semibold transition-all hover:bg-neutral-700"
        onClick={() => setPage("Overview")}
      >
            <Globe />
            Overview
          </button>
          <button
            className="flex items-center gap-x-6 py-6 pl-8 pr-20 font-semibold transition-all hover:bg-neutral-700"
            onClick={() => setSelectedSettings("Instruments")}
          >
            <Trumpet />
            Instruments
          </button>
          <button
            className="flex items-center gap-x-6 py-6 pl-8 pr-20 font-semibold transition-all hover:bg-neutral-700"
            onClick={() => setSelectedSettings("Permissions")}
          >
            <Check />
            Permissions
          </button>
        </div> */
}
