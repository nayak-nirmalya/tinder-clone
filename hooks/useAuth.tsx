import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";

interface AuthProps {
  children?: React.ReactNode;
}

interface AuthContextType {
  user: string;
}

const AuthContext = createContext<AuthContextType | null>({ user: "" });

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  return (
    <AuthContext.Provider value={{ user: "Nirmalya" }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
