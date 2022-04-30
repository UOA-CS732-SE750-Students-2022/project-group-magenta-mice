import { MockController } from "@simulate-exchange/common";
import {
  Permission,
  useCreateInviteMutation,
  useFindExchangeQuery,
  useGenerateApiKeyMutation,
} from "@simulate-exchange/gql";
import { useLoggedInRedirect } from "@simulate-exchange/hooks";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  CopyButton,
  ExchangeUserSummary,
  HideShowButton,
  useCopyButtonController,
  useExchangeUserSummaryController,
  useHideShowButtonController,
} from "../../..";

interface PermissionSettingsProps {
  useController: typeof usePermissionSettingsController;
}

const hiddenSecretText = "********-****-****-****-************";

export const PermissionSettings: React.FC<PermissionSettingsProps> = ({
  useController,
}) => {
  const {
    apiKey,
    apiKeyText,
    apiKeyVisible,
    handleToggleApiSecretDisplay,
    handleToggleInviteSecretDisplay,
    trueInviteLink,
    inviteLink,
    inviteVisible,
    permissions,
    currentUserPermission,
  } = useController();

  return (
    <div className="flex flex-col gap-4 text-white">
      <p className="flex items-center gap-x-4 text-4xl font-bold text-gray-50">
        Permissions
      </p>
      <div className="flex items-center gap-2">
        <div className="flex w-full flex-col">
          <span className="font-semibold uppercase">Access Key</span>
          <span className="text-sm font-semibold text-gray-400">
            Use this when logging into the exchange from your bot.
          </span>
          <div
            className={`mt-2 flex rounded bg-neutral-700 text-gray-100 ring-1 ring-neutral-800 transition-all focus-within:ring-emerald-600`}
          >
            <input
              value={apiKeyText}
              readOnly
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="min-w-0 flex-grow rounded border-0 border-none bg-transparent p-2 py-3 font-mono outline-none ring-0 transition-all focus:outline-none"
            />
            <HideShowButton
              onClick={handleToggleApiSecretDisplay}
              isShown={apiKeyVisible}
              useController={useHideShowButtonController}
            />
            <CopyButton text={apiKey} useController={useCopyButtonController} />
          </div>
        </div>
      </div>

      {currentUserPermission?.permission === Permission.Admin && (
        <div className="flex items-center gap-2">
          <div className="flex w-full flex-col">
            <span className="font-semibold uppercase">Invite Link</span>
            <span className="text-sm font-semibold text-gray-400">
              Share this link to invite others to your exchange.
            </span>
            <div
              className={`mt-2 flex rounded bg-neutral-700 text-gray-100 ring-1 ring-neutral-800 transition-all focus-within:ring-emerald-600`}
            >
              <input
                value={inviteLink}
                readOnly
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="min-w-0 flex-grow rounded border-0 border-none bg-transparent p-2 py-3 font-mono outline-none ring-0 transition-all focus:outline-none"
              />
              <HideShowButton
                onClick={handleToggleInviteSecretDisplay}
                isShown={inviteVisible}
                useController={useHideShowButtonController}
              />
              <CopyButton
                text={trueInviteLink}
                useController={useCopyButtonController}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-xl font-bold">Users</span>
        {permissions?.map((permission) => (
          <ExchangeUserSummary
            key={permission?.id}
            user={permission?.user}
            permission={permission?.permission}
            useController={useExchangeUserSummaryController}
          />
        ))}
      </div>
    </div>
  );
};

export const usePermissionSettingsController = () => {
  const uri = useMemo(() => window.location.origin, []);

  const router = useRouter();
  const { loading: loggedInLoading } = useLoggedInRedirect();
  const { id } = router.query;
  const {
    error,
    data,
    loading: dataLoading,
  } = useFindExchangeQuery({
    variables: { id: id as string },
    skip: !id || loggedInLoading,
  });

  // useFullLoader(loggedInLoading || dataLoading);

  const [generateApiKey] = useGenerateApiKeyMutation();
  const [createInvite] = useCreateInviteMutation();

  const [apiKey, setApiKey] = useState("");
  const [apiKeyText, setApiKeyText] = useState(hiddenSecretText);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  const [invite, setInvite] = useState("");
  const [inviteText, setInviteText] = useState(hiddenSecretText);
  const [inviteVisible, setInviteVisible] = useState(false);

  const uid = getAuth().currentUser?.uid;
  const permissions = data?.exchange.userPermissions;

  const currentUserPermission = useMemo(
    () => permissions?.find((p) => p.user.id === uid),
    [permissions, uid],
  );

  const inviteLinkText = useMemo(
    () => `${uri}/invite/${inviteText}`,
    [uri, inviteText],
  );

  const trueInviteLink = useMemo(
    () => `${uri}/invite/${invite}`,
    [uri, invite],
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      router.push("/");
    }
  }, [error, router]);

  useEffect(() => {
    if (router.isReady && !dataLoading && data) {
      if (currentUserPermission?.permission === Permission.Admin) {
        createInvite({ variables: { exchangeId: id as string, userId: "" } })
          .then((res) => {
            setInvite(res.data?.createInvite.id ?? "Error");
          })
          .catch(() => {
            toast.error(error?.message);
            router.push("/");
          });
      }

      generateApiKey({
        variables: { exchangeId: id as string, forceNew: false },
      }).then((res) => {
        setApiKey(res.data?.generateApiKey.apiKey ?? "Error");
      });
    }
  }, [
    router,
    data,
    dataLoading,
    createInvite,
    id,
    currentUserPermission,
    error,
    generateApiKey,
  ]);

  const handleToggleApiSecretDisplay = () => {
    setApiKeyVisible(!apiKeyVisible);
    setApiKeyText(apiKeyVisible ? hiddenSecretText : apiKey);
  };

  const handleToggleInviteSecretDisplay = () => {
    setInviteVisible(!inviteVisible);
    setInviteText(inviteVisible ? hiddenSecretText : invite);
  };

  return {
    handleToggleApiSecretDisplay,
    handleToggleInviteSecretDisplay,
    apiKey,
    apiKeyText,
    apiKeyVisible,
    invite,
    trueInviteLink,
    inviteVisible,
    inviteLink: inviteLinkText,
    permissions,
    currentUserPermission,
  };
};

export const useMockPermissionSettingsController: MockController<
  typeof usePermissionSettingsController
> = () => {
  return {
    apiKey: "key",
    apiKeyText: "key",
    apiKeyVisible: false,
    invite: "invite",
    trueInviteLink: "invite",
    inviteVisible: false,
    inviteLink: "invite",
    permissions: [],
    handleToggleApiSecretDisplay: () => null,
    handleToggleInviteSecretDisplay: () => null,
    currentUserPermission: {
      id: "id",
      user: {
        email: "email",
        id: "id",
        name: "name",
        photoUrl: "photoUrl",
        username: "username",
      },
      permission: Permission.Admin,
      __typename: "UserPermission",
    },
  };
};

export default PermissionSettings;
