import React, { useState } from "react";

const AuthContext = React.createContext({
  // token: "",
  isLoggedIn: true,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login: loginHandler, logout: logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
