import { Permission, User } from "@simulate-exchange/gql";
import React from "react";

export interface ExchangeUserSummaryProps {
  useController: typeof useExchangeUserSummaryController;
  permission: Permission;
  user: Partial<User>;
}

export const ExchangeUserSummary: React.FC<ExchangeUserSummaryProps> = ({
  useController,
  user,
  permission,
}) => {
  const { removeUser } = useController();

  return (
    <div className="flex items-center justify-between rounded border p-4 text-gray-600 dark:border-0 dark:bg-neutral-800 dark:text-white">
      <div className="flex items-center gap-4">
        <img
          src={user.profilePicUrl ?? ""}
          className="h-12 w-12 rounded-full"
          alt="pfp"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col justify-center ">
          <span className="font-bold">{user?.name}</span>
          <span>{user?.email}</span>
        </div>
      </div>
    </div>
  );
};

export const useExchangeUserSummaryController = () => {
  const removeUser = () => {
    // todo
  };

  return { removeUser };
};

export const useMockExchangeUserSummaryController: typeof useExchangeUserSummaryController =
  () => {
    const removeUser = () => {
      // todo
    };

    return { removeUser };
  };

export default ExchangeUserSummary;
