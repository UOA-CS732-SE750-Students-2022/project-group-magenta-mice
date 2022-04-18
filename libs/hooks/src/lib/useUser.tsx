import { getAuth, User } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFullLoader } from "..";

export const useUser = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>()
  const [loading, setLoading] = useState(true)
  useFullLoader(loading)

  useEffect(() => {
    const unregisterListener = getAuth().onAuthStateChanged(auth => {
      if (auth) {
        setUser(auth)
      }
      setLoading(false)
    })

    return () => unregisterListener()
  }, [router])

  return { user, loading };
};
