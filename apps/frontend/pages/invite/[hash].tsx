import { Layout } from "@simulate-exchange/components";
import { useRouter } from "next/router";

export function Invite() {
  const router = useRouter()
  const { hash } = router.query

  return (
    <Layout.Page>{hash}</Layout.Page>
  );
}

export default Invite;
