import {
  CurrentUserDocument,
  CurrentUserQuery,
  Exchange,
  FindExchangeDocument,
  FindExchangeQuery,
  Permission,
  useDeleteExchangeMutation,
  useEditExchangeMutation,
  useStartExchangeMutation,
} from "@simulate-exchange/gql";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Router from "next/router";
import { ColorSelect } from "../../..";
import { getAuth } from "@firebase/auth";

interface OverviewSettingsProps {
  useController: typeof useOverviewSettingsController;
  currentExchange: FindExchangeQuery["exchange"];
  exchangeID: string;
}

export const OverviewSettings: React.FC<OverviewSettingsProps> = ({
  useController,
  currentExchange,
  exchangeID,
}) => {
  const {
    handleStartExchange,
    startExchangeLoading,
    startExchangeData,
    currentUserPermission,
    handleEditExchange,
    setNewExchangeName,
    newColor,
    setNewColor,
  } = useController(currentExchange);

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
              setSelectedColor={setNewColor}
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

      <div className="flex items-center gap-4">
        {currentUserPermission?.permission === "ADMIN" && (
          <button
            className="mt-4 self-start rounded-md bg-emerald-600 p-2 px-4 text-lg font-semibold text-gray-200 transition-colors hover:bg-emerald-500"
            onClick={handleStartExchange}
            disabled={
              !!currentExchange.port ||
              startExchangeLoading ||
              !startExchangeData?.startExchange
            }
          >
            Start Exchange
          </button>
        )}
        <button
          className="mt-4 self-start rounded-md bg-rose-700 p-2 px-4 text-lg font-semibold text-gray-200 transition-all hover:bg-rose-600"
          onClick={handleDeleteExchange}
          disabled={loading}
        >
          Delete Exchange
        </button>
      </div>
    </div>
  );
};

export const useOverviewSettingsController = (
  currentExchange: FindExchangeQuery["exchange"],
) => {
  const [newExchangeName, setNewExchangeName] = useState(currentExchange.name);
  const [newColor, setNewColor] = useState(currentExchange.colour);

  const [editExchange] = useEditExchangeMutation();
  const [
    startExchange,
    { loading: startExchangeLoading, data: startExchangeData },
  ] = useStartExchangeMutation();

  const uid = getAuth().currentUser?.uid;
  const permissions = currentExchange.userPermissions;

  const currentUserPermission = useMemo(
    () => permissions?.find((p) => p.user.id === uid),
    [permissions, uid],
  );

  const handleStartExchange = useCallback(async () => {
    try {
      const promise = startExchange({
        variables: {
          id: currentExchange.id,
        },
        refetchQueries: [CurrentUserDocument],
      });
      toast.promise(promise, {
        pending: "Starting Exchange...",
        success: "Successfully Started Exchange!",
        error: "Failed to Start Exchange.",
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentExchange, startExchange]);

  const handleEditExchange = useCallback(async () => {
    try {
      const promise = editExchange({
        variables: {
          id: currentExchange.id,
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
  }, [editExchange, currentExchange, newExchangeName, newColor]);

  return {
    setNewExchangeName,
    startExchangeData,
    currentUserPermission,
    newColor,
    setNewColor,
    handleEditExchange,
    handleStartExchange,
    startExchangeLoading,
  };
};

export default OverviewSettings;
