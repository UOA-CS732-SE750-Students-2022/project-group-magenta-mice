import { Components } from "@simulate-exchange/components";
import { useGetUserQuery } from "@simulate-exchange/gql";

export function Index() {
  const { data, loading } = useGetUserQuery({
    variables: {
      unused: 1,
    },
  });
  return (
    <div>
      <Components />
      {loading ? <>Loading</> : <div>{data?.user?.exampleField}</div>}
    </div>
  );
}

export default Index;
