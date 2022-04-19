import React, { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

type LoggedInData = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const LoggedInContext = React.createContext<LoggedInData>({
  loggedIn: false,
  isLoading: true,

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoggedIn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoading: () => {},
});

export const LoggedInProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // returns function to stop the listener
    const clearListener = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setIsLoading(false);
    });
    return () => {
      clearListener();
    };
  }, []);

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn, isLoading, setIsLoading }}>
      {children}
    </LoggedInContext.Provider>
  );
};
export const useIsLoggedIn = () => useContext(LoggedInContext);
