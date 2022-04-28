import {
  Layout,
  ExchangeUserSummary,
  useExchangeUserSummaryController,
} from "@simulate-exchange/components";
import {
  Permission,
  useCreateInviteMutation,
  useFindExchangeQuery,
} from "@simulate-exchange/gql";
import { useFullLoader, useIsLoggedIn } from "@simulate-exchange/hooks";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function Exchange() {
  const { loggedIn } = useIsLoggedIn();
  useFullLoader(!loggedIn);
  return <Layout.Page>{loggedIn ? <AuthComponent /> : <></>}</Layout.Page>;
}

function AuthComponent() {
  const router = useRouter();
  const { id } = router.query;
  const { error, data, loading } = useFindExchangeQuery({
    variables: { id: id as string },
    skip: !id,
  });
  const [createInvite] = useCreateInviteMutation();
  const [invite, setInvite] = useState("");

  const uid = getAuth().currentUser.uid;
  const permissions = data?.exchange.userPermissions;
  const currentUserPermission = permissions?.find((p) => p.user.id === uid);

  useEffect(() => {
    if (error) {
      console.log(error);
      router.push("/");
      // change above to an alert when implemented
    }
  }, [error, router]);

  useFullLoader(loading);
  useEffect(() => {
    if (
      router.isReady &&
      !loading &&
      data &&
      currentUserPermission?.permission === Permission.Admin
    ) {
      createInvite({ variables: { exchangeId: id as string, userId: "" } })
        .then((res) => {
          setInvite(`http://localhost:4200/invite/${res.data.createInvite.id}`);
        })
        .catch(() => router.push("/"));
      // change above to an alert when implemented
    }
  }, [router, data, loading, createInvite, id, currentUserPermission]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <span>Users</span>
        {permissions?.map((permission) => (
          <ExchangeUserSummary
            key={permission.id}
            user={permission.user}
            permission={permission.permission}
            useController={useExchangeUserSummaryController}
          />
        ))}
      </div>
      {currentUserPermission?.permission === Permission.Admin && (
        <span>
          Invite Link:{" "}
          <a rel="noreferrer" target="_blank" href={invite}>
            {invite}
          </a>
        </span>
      )}
    </div>
  );
}

export default Exchange;
