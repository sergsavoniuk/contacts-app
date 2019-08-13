import React, { createContext, useContext } from "react";
import useAuth from "./useAuth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const user = useAuth();

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuthContext };
