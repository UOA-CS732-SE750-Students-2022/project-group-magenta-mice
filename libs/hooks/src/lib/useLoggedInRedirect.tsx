import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIsLoggedIn, useFullLoader } from "..";

export const useLoggedInRedirect = () => {
  const { loggedIn, loading, user } = useIsLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !loggedIn) {
      router.push("/landing");
    }
  }, [loggedIn, loading, router]);

  useFullLoader(loading);

  return { loggedIn, loading, user };
};
