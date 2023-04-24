import React, { createContext, useContext, useEffect } from "react";

import {
  ANDROID_OAUTH_CLIENT_ID_FIREBASE,
  IOS_OAUTH_CLIENT_ID_FIREBASE,
  EXPO_CLIENT_ID
} from "@env";

interface AuthProps {
  children?: React.ReactNode;
}

interface AuthContextType {
  user: string | null;
  promptAsync: () => void;
  signInWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: "",
  signInWithGoogle: () => {},
  promptAsync: () => {}
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  return (
    <AuthContext.Provider
      value={{
        user: null,
        signInWithGoogle: () => {},
        promptAsync: () => {}
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
