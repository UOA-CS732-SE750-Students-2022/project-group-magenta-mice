import { Layout } from "@simulate-exchange/components";
import { useCurrentUserQuery } from "@simulate-exchange/gql";

export default function Index() {
  const { data } = useCurrentUserQuery();
  console.log(data);

  return <Layout.Page></Layout.Page>;
}
