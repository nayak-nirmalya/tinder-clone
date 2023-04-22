import { View, Text } from "react-native";
import React, { createContext } from "react";

type AuthProps = {
  children?: React.ReactNode;
};

const AuthContext = createContext({});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
