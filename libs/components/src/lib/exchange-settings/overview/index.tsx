import {
  CurrentUserDocument,
  CurrentUserQuery,
  FindExchangeDocument,
  FindExchangeQuery,
  Permission,
  useDeleteExchangeMutation,
  useEditExchangeMutation,
} from "@simulate-exchange/gql";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Router from "next/router";
import { ColorSelect } from "../../..";

interface OverviewSettingsProps {
  useController: typeof useOverviewSettingsController;
  currentExchange: {
    __typename?: "Exchange";
    public: boolean;
    name: string;
    colour: number;
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
  const { setNewExchangeName, newColor, setnewColor, handleEditExchange } =
    useController(currentExchange.name, currentExchange.colour, exchangeID);

  const [deleteExchange, { loading }] = useDeleteExchangeMutation();

  const handleDeleteExchange = useCallback(async () => {
    try {
      const promise = deleteExchange({
        variables: {
          id: exchangeID,
        },
        refetchQueries: [CurrentUserDocument],
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
      <div className="mt-4 flex flex-col rounded-md bg-neutral-800 p-5">
        <p className="text-gray-200">Exchange Name</p>
        <div>
          <input
            className="mt-2 w-full rounded-md bg-neutral-700 p-2 text-lg text-gray-200  "
            defaultValue={currentExchange?.name}
            onChange={(e) => setNewExchangeName(e.target.value)}
          ></input>
        </div>
        <div className="mt-4">
          <p className="mb-2 text-gray-200">Color</p>
          <div className="float-left">
            <ColorSelect
              selectedColor={newColor}
              setSelectedColor={setnewColor}
            />
          </div>
        </div>
        <button
          className="mt-8 self-start rounded-md bg-emerald-600 p-2 px-4 text-lg font-semibold text-gray-200 transition-all hover:bg-emerald-500"
          onClick={handleEditExchange}
        >
          Update Exchange
        </button>
      </div>

      <p className="mt-4 text-gray-200">Potentially data graphics here</p>

      <button
        className="mt-4 self-start rounded-md bg-rose-700 p-2 px-4 text-lg font-semibold text-gray-200 transition-all hover:bg-rose-600"
        onClick={handleDeleteExchange}
        disabled={loading}
      >
        Delete Exchange
      </button>
    </div>
  );
};

export const useOverviewSettingsController = (
  currentExchangeName: string,
  currentExchangeColor: number,
  exchangeID: string,
) => {
  const [newExchangeName, setNewExchangeName] = useState(currentExchangeName);
  const [newColor, setnewColor] = useState(currentExchangeColor);

  const [editExchange] = useEditExchangeMutation();

  const handleEditExchange = useCallback(async () => {
    try {
      const promise = editExchange({
        variables: {
          id: exchangeID,
          name: newExchangeName,
          color: newColor,
        },

        refetchQueries: [FindExchangeDocument],
      });

      toast.promise(promise, {
        pending: "Editing Exchange...",
        success: "Successfully Edited Exchange!",
        error: "Failed to Edit Exchange.",
      });
    } catch (error) {
      console.log(error);
    }
  }, [editExchange, exchangeID, newExchangeName, newColor]);

  return { setNewExchangeName, newColor, setnewColor, handleEditExchange };
};

export default OverviewSettings;
