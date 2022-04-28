import { Permission, User } from "@simulate-exchange/gql";
import React from "react";

interface ExchangeUserSummaryProps {
  useController: typeof useExchangeUserSummaryController;
  permission: Permission;
  user: User;
}

export const ExchangeUserSummary: React.FC<ExchangeUserSummaryProps> = ({
  useController,
  user,
  permission,
}) => {
  const { removeUser } = useController();

  return (
    <div className="flex items-center justify-between rounded bg-neutral-800 p-4 text-white">
      <div className="flex items-center gap-4">
        <img
          src={user.profilePicUrl ?? ""}
          className="h-12 w-12 rounded-full"
          alt="pfp"
        />
        <div className="flex flex-col justify-center ">
          <span className="font-bold">{user.name}</span>
          <span>{user.email}</span>
        </div>
      </div>
      <div>
        {permission !== Permission.Admin && (
          <span onClick={removeUser} className="cursor-pointer text-red-500">
            Remove
          </span>
        )}
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
