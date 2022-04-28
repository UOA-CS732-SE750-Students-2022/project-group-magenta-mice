import { User } from "@simulate-exchange/gql";
import React from "react";

interface ExchangeUserSummaryProps {
  useController: typeof useExchangeUserSummaryController;
  permission: string;
  user: User;
}

export const ExchangeUserSummary: React.FC<ExchangeUserSummaryProps> = ({
  useController,
  user,
  permission,
}) => {
  //const {} = useController();

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
      <div>{permission}</div>
    </div>
  );
};

export const useExchangeUserSummaryController = () => {
  return {};
};

export const useMockExchangeUserSummaryController: typeof useExchangeUserSummaryController =
  () => {
    return {};
  };

export default ExchangeUserSummary;
