import {
  Layout,
  ExchangeUserSummary,
  useExchangeUserSummaryController,
  CopyButton,
  useCopyButtonController,
  HideShowButton,
  useHideShowButtonController,
} from "@simulate-exchange/components";
import {
  Permission,
  useCreateInviteMutation,
  useFindExchangeQuery,
} from "@simulate-exchange/gql";
import { useFullLoader, useLoggedInRedirect } from "@simulate-exchange/hooks";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DuplicateIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const uri = "http://localhost:4200";
const hiddenApiSecret = "********-****-****-****-************";

export function Exchange() {
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

  useFullLoader(loggedInLoading || dataLoading);

  const [createInvite] = useCreateInviteMutation();
  const [invite, setInvite] = useState("");
  const [inviteSecret, setInviteSecret] = useState(hiddenApiSecret);
  const [viewInviteSecret, setViewApiSecret] = useState(false);
  const [apiSecret, setApiSecret] = useState(hiddenApiSecret);
  const [viewApiSecret, setViewSecret] = useState(false);

  const uid = getAuth().currentUser?.uid;
  const permissions = data?.exchange.userPermissions;
  const currentUserPermission = permissions?.find((p) => p.user.id === uid);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      router.push("/");
    }
  }, [error, router]);

  useEffect(() => {
    if (
      router.isReady &&
      !dataLoading &&
      data &&
      currentUserPermission?.permission === Permission.Admin
    ) {
      createInvite({ variables: { exchangeId: id as string, userId: "" } })
        .then((res) => {
          setInvite(res.data.createInvite.id);
        })
        .catch(() => {
          toast.error(error.message);
          router.push("/");
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
  ]);

  const handleToggleApiSecretDisplay = () => {
    setViewSecret(!viewApiSecret);
    setApiSecret(viewApiSecret ? hiddenApiSecret : currentUserPermission?.id);
  };

  const handleToggleInviteSecretDisplay = () => {
    setViewApiSecret(!viewInviteSecret);
    setInviteSecret(viewInviteSecret ? hiddenApiSecret : invite);
  };

  const inviteLink = `${uri}/invite/${inviteSecret}`;

  return (
    <Layout.Page>
      <div className="flex flex-col gap-4 text-white">
        <span className="text-3xl font-bold">{data?.exchange.name}</span>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Your API Secret:</span>
          <span>{apiSecret}</span>

          <HideShowButton
            onClick={handleToggleApiSecretDisplay}
            isShown={viewApiSecret}
            useController={useHideShowButtonController}
          />

          <CopyButton
            text={currentUserPermission?.id}
            useController={useCopyButtonController}
          />
        </div>

        {currentUserPermission?.permission === Permission.Admin && (
          <div className="flex items-center gap-2">
            <span className="font-semibold">Invite Link:</span>
            <a rel="noreferrer" target="_blank" href={inviteLink}>
              {inviteLink}
            </a>

            <HideShowButton
              onClick={handleToggleInviteSecretDisplay}
              isShown={viewInviteSecret}
              useController={useHideShowButtonController}
            />

            <CopyButton
              text={`${uri}/invite/${invite}`}
              useController={useCopyButtonController}
            />
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
    </Layout.Page>
  );
}

export default Exchange;
