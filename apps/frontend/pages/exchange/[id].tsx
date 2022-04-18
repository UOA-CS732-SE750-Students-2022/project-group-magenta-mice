import { Layout } from "@simulate-exchange/components";
import { useRouter } from "next/router";

export function Exchange() {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout.Page>{id}</Layout.Page>
  );
}

export default Exchange;
