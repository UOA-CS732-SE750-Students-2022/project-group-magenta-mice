import { Permission } from "@simulate-exchange/gql";
import { useDeleteExchangeMutation } from "@simulate-exchange/gql";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import Router from "next/router";

interface OverviewSettingsProps {
  useController: typeof useOverviewSettingsController;
  currentExchange: {
    __typename?: "Exchange";
    public: boolean;
    name: string;
    userPermissions: {
      __typename?: "UserPermission";
      id: string;
      permission: Permission;
      user: {
        __typename?: "User";
        name: string;
        id: string;
        email: string;
        profilePicUrl?: string;
      };
    }[];
    instruments: {
      __typename?: "Instrument";
      id: string;
      name: string;
      tickSizeMin: number;
      positionLimit: number;
    }[];
  };
  exchangeID: string;
}

export const OverviewSettings: React.FC<OverviewSettingsProps> = ({
  useController,
  currentExchange,
  exchangeID,
}) => {
  const [deleteExchange, { loading }] = useDeleteExchangeMutation();

  const handleDeleteExchange = useCallback(async () => {
    try {
      const promise = deleteExchange({
        variables: {
          id: exchangeID,
        },
      });
      toast.promise(promise, {
        pending: "Deleting Exchange...",
        success: "Successfully Deleted Exchange!",
        error: "Failed to Delete Exchange.",
      });
      Router.push("/exchange");
    } catch (error) {
      console.log(error);
    }
  }, [deleteExchange, exchangeID]);

  return (
    <div className="flex flex-col">
      <p className="flex items-center gap-x-4 text-4xl font-bold text-gray-50">
        Overview
      </p>
      <p className="pt-2 text-gray-200">Exchange Name</p>
      <div>
        <input
          className="mt-2 w-1/3 rounded-md bg-neutral-800 p-2 text-lg text-gray-200"
          defaultValue={currentExchange?.name}
        ></input>
        <button className="ml-4 rounded-md bg-emerald-600 p-2 text-lg font-semibold text-gray-200 transition-all hover:bg-emerald-500">
          Change
        </button>
      </div>
      <p className="mt-4 text-gray-200">Potentially data graphics here</p>

      <button
        className="mt-4 w-1/3 rounded-md bg-rose-700 p-2 text-lg font-semibold text-gray-200 transition-all hover:bg-rose-600"
        onClick={handleDeleteExchange}
        disabled={loading}
      >
        Delete Exchange
      </button>
    </div>
  );
};

export const useOverviewSettingsController = () => {
  return {};
};

export const useMockOverviewSettingsController: typeof useOverviewSettingsController =
  () => {
    return {};
  };

export default OverviewSettings;
