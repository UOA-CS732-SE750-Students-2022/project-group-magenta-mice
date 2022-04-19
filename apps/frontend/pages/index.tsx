import { Layout } from "@simulate-exchange/components";
import { useCurrentUserQuery } from "@simulate-exchange/gql";
import { useIsLoggedIn } from "@simulate-exchange/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const { data } = useCurrentUserQuery();
  const router = useRouter();

  const { loggedIn, isLoading } = useIsLoggedIn();
  useEffect(() => {
    if (!isLoading && !loggedIn) {
      router.push("/landing");
    }
  }, [loggedIn, isLoading, router]);
  // console.log(data);

  return <Layout.Page></Layout.Page>;
}
