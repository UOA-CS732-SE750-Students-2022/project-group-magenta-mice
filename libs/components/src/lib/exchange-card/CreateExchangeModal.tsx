import { MockController } from "@simulate-exchange/common";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  Permission,
  useCreateExchangeMutation,
} from "@simulate-exchange/gql";
import { gql } from "apollo-server-core";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { ColorSelect, CustomModal, useCustomModalController } from "../..";

interface CreateExchangeModalProps {
  handleCloseModal: () => void;
  isOpen: boolean;
  useController: typeof useCreateExchangeModalController;
}

const CreateExchangeModal: React.FC<CreateExchangeModalProps> = ({
  handleCloseModal,
  isOpen,
  useController,
}) => {
  const {
    color,
    handleCreateExchange,
    newExchangeName,
    setColor,
    setNewExchangeName,
  } = useController(handleCloseModal);

  return (
    <CustomModal
      open={isOpen}
      hasConfirm={true}
      hasCancel={true}
      onClose={handleCloseModal}
      onConfirm={handleCreateExchange}
      title="Create An Exchange"
      useController={useCustomModalController}
    >
      <div className="mx-8 mt-4">
        <form className="">
          <label className="mr-4 flex flex-col gap-y-2 text-left text-gray-50">
            Name:
            <input
              type="text"
              autoComplete="none"
              name="name"
              className="rounded-lg bg-neutral-700 py-2 px-3 outline-none focus:ring-1 focus:ring-emerald-600 "
              onChange={(e) => setNewExchangeName(e.target.value)}
              value={newExchangeName}
              placeholder="My Stock Exchange"
            />
          </label>
          <div className="flex flex-col pb-2 text-left">
            <label className="float-left mt-8 mb-2 text-gray-50">Color:</label>
            <ColorSelect selectedColor={color} setSelectedColor={setColor} />
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export const useCreateExchangeModalController = (
  handleCloseModal: () => void,
) => {
  const [newExchangeName, setNewExchangeName] = React.useState("");
  const [color, setColor] = React.useState(1);

  const [createExchange] = useCreateExchangeMutation();

  const handleCreateExchange = useCallback(async () => {
    try {
      const promise = createExchange({
        variables: {
          color,
          name: newExchangeName,
        },
        optimisticResponse: {
          __typename: "Mutation",
          createExchange: {
            __typename: "Exchange",
            id: Math.random().toString(),
            colour: color,
            name: newExchangeName,
            userPermissions: [
              {
                __typename: "UserPermission",
                id: Math.random().toString(),
              },
            ],
          },
        },
        update: (cache, { data: result }) => {
          const data = cache.readQuery<CurrentUserQuery>({
            query: CurrentUserDocument,
          });
          if (data) {
            cache.writeQuery({
              query: CurrentUserDocument,
              data: {
                ...data,
                currentUser: {
                  ...data.currentUser,
                  userPermissions: [
                    ...data.currentUser.userPermissions,
                    {
                      __typename: "UserPermission",
                      id: result?.createExchange.userPermissions[0]?.id,
                      permission: Permission.Admin,
                      apiKey: "unused",
                      exchange: {
                        __typename: "Exchange",
                        id: result?.createExchange.id,
                        name: result?.createExchange.name,
                        colour: result?.createExchange.colour,
                        userPermissions: [
                          {
                            id: result?.createExchange.userPermissions[0]?.id,
                          },
                        ],
                        instruments: [],
                      },
                    },
                  ],
                },
              },
            });
          }
        },
      });

      toast.promise(promise, {
        pending: "Creating exchange...",
        success: "Successfully Created Exchange!",
        error: "Failed to create exchange.",
      });

      handleCloseModal();

      await promise;
    } catch (err) {
      console.error(err);
    }
  }, [color, createExchange, newExchangeName, handleCloseModal]);

  return {
    newExchangeName,
    setNewExchangeName,
    color,
    setColor,
    handleCreateExchange,
  };
};

export const useMockCreateExchangeModalController: MockController<
  typeof useCreateExchangeModalController
> = (handleCloseModal?: () => void) => {
  const [newExchangeName, setNewExchangeName] = React.useState("");
  const [color, setColor] = React.useState(1);

  return {
    color,
    handleCreateExchange: () => null,
    newExchangeName,
    setColor,
    setNewExchangeName,
  };
};

export default CreateExchangeModal;
