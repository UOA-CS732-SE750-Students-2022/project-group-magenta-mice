import React, { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

type LoggedInData = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
const LoggedInContext = React.createContext<LoggedInData>({
  loggedIn: false,

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoggedIn: () => {},
});

export const LoggedInProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    // returns function to stop the listener
    const clearListener = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return () => {
      clearListener();
    };
  }, []);

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};
export const useIsLoggedIn = () => useContext(LoggedInContext);
