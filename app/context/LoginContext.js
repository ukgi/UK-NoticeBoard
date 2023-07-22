"use client";

const { createContext, useState, useContext } = require("react");

const LoginContext = createContext({
  loginData: null,
  loginHandler: function (loginData) {},
  logoutHandler: function () {},
});

export function LoginContextProvider({ children }) {
  const [loginData, setLoginData] = useState();

  function loginHandler(loginData) {
    setLoginData(loginData);
  }

  function logoutHandler() {
    setLoginData(null);
  }

  const context = {
    loginData: loginData,
    loginHandler,
    logoutHandler,
  };

  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}
