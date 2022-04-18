import { Layout } from "@simulate-exchange/components";
import { useRouter } from "next/router";
import { useUser } from "@simulate-exchange/hooks";
import { useEffect } from "react";

export function Invite() {
  const router = useRouter()
  const { user, loading } = useUser()
  const { hash } = router.query

  useEffect(() => {
    if (router.isReady && !user && !loading) {
      router.push(`/auth?invite=${hash}`)
    }

    // todo: verify that invite is legit
  }, [router, user, hash, loading])

  if (!user) return <></>
  return (
    <Layout.Page>{hash} - {user.email}</Layout.Page>
  );
}

export default Invite;
