import React, { useContext, useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";
import { useCurrentUserQuery } from '@simulate-exchange/gql'

type LoggedInData = {
  loggedIn: boolean;
  loading: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
export const LoggedInContext = React.createContext<LoggedInData>({
  loggedIn: false,
  loading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoggedIn: () => {},
});

export const LoggedInProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // returns function to stop the listener
    const clearListener = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
    return () => {
      clearListener();
    };
  }, []);

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn, loading }}>
      {children}
    </LoggedInContext.Provider>
  );
};
export const useIsLoggedIn = () => useContext(LoggedInContext);
