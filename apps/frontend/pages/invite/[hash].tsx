import { Layout, Loading } from "@simulate-exchange/components";
import { useRouter } from "next/router";
import { useFullLoader, useIsLoggedIn } from "@simulate-exchange/hooks";
import { useEffect } from "react";
import { useCheckInviteQuery, useJoinExchangeMutation } from "@simulate-exchange/gql";

export function Invite() {
  const { loading, loggedIn } = useIsLoggedIn();
  useFullLoader(loading)
  return <Layout.Page>{!loading ? <AuthComponent loggedIn={loggedIn} /> : <></>}</Layout.Page>
}

const AuthComponent = ({ loggedIn }: { loggedIn: boolean }) => {
  const router = useRouter()
  const { hash } = router.query
  const { error, data, loading } = useCheckInviteQuery({ variables: { id: hash as string }, skip: !router.isReady })
  const [joinExchange] = useJoinExchangeMutation()

  useEffect(() => {
    if (error) {
      console.log(error)
      router.push("/")
      // change above to an alert when implemented
    }
  }, [error, router])

  useEffect(() => {
    if (router.isReady && !loggedIn) {
      router.push(`/auth?invite=${hash}`)
    }

    if (loggedIn && data && data.checkInvite) {
      joinExchange({ variables: { id: hash as string }})
        .then(res => {
          router.push(`/exchange/${res.data.joinExchange.exchange.id}`)
        })
        .catch(() => router.push("/"))
        // change above to an alert when implemented
    }
  }, [router, hash, loggedIn, data, loading, joinExchange])

  if (!loggedIn) return <></>
  return <Loading />
}

export default Invite;
