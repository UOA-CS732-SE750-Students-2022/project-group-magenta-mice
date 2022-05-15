import { getAuth, User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useApolloClient } from "@apollo/react-hooks";

type LoggedInData = {
  loggedIn: boolean;
  loading: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
};
export const LoggedInContext = React.createContext<LoggedInData>({
  loggedIn: false,
  loading: true,
  setLoggedIn: () => null,
  user: null,
});

export const LoggedInProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    // returns function to stop the listener
    const clearListener = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
      } else {
        setLoggedIn(false);
        setUser(null);
        client.cache.reset();
      }
      setLoading(false);
    });
    return () => {
      clearListener();
    };
  }, []);

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn, loading, user }}>
      {children}
    </LoggedInContext.Provider>
  );
};
export const useIsLoggedIn = () => useContext(LoggedInContext);
