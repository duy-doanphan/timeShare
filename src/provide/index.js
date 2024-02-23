import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [isLogin, setIsLogin] = useState(
    () => JSON.parse(sessionStorage.getItem("isLogin")) || false
  );

  const [userInformation, setUserInformation] = useState(
    () => JSON.parse(sessionStorage.getItem("userInformation")) || {}
  );

  useEffect(() => {
    sessionStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [isLogin]);

  useEffect(() => {
    sessionStorage.setItem("userInformation", JSON.stringify(userInformation));
  }, [userInformation]);

  return (
    <GlobalContext.Provider
      value={{ isLogin, setIsLogin, userInformation, setUserInformation }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider
