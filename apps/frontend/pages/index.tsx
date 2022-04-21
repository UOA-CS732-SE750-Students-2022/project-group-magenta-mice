
import { Layout, Loading } from "@simulate-exchange/components";
import { useCreateTestExchangeMutation, useCurrentUserQuery } from "@simulate-exchange/gql";
import { useFullLoader, useIsLoggedIn } from "@simulate-exchange/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const { loggedIn, loading } = useIsLoggedIn();
  const router = useRouter()
  useFullLoader(loading)

  useEffect(() => {
    if (!loading && !loggedIn) {
      router.push("/landing");
    }
  }, [loggedIn, loading, router]);

  return <Layout.Page>{loggedIn ? <AuthComponent /> : <></>}</Layout.Page>
}

const AuthComponent = () => {
  const { data, loading } = useCurrentUserQuery();
  const [createTestExchange] = useCreateTestExchangeMutation()
  const router = useRouter()

  const onClick = async () => {
    const { data } = await createTestExchange()
    router.push(`/exchange/${data.createTestExchange.id}`)
  }

  if (loading) return <Loading />
  return (
    <Layout.Page>
      <div className="flex flex-col gap-2">
        <span>Hi {data?.currentUser.name}</span>
        <div>
          <span>Your Exchanges:</span>
          {data?.currentUser.userPermissions.map(permission => (
            <div key={permission.exchange.id} className="flex gap-1">
              <a className="text-blue-500" href={`/exchange/${permission.exchange.id}`}>{permission.exchange.id}</a>
              <span>-</span>
              <span>{permission.permission}</span>
            </div>
          ))}
        </div>
        <button
          className="self-start bg-green-500 px-2 py-1 text-white rounded font-bold"
          onClick={onClick}
        >Create Test Exchange</button>
      </div>
    </Layout.Page>
  )
}
