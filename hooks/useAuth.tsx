import { View, Text } from "react-native";
import React, { createContext, useContext, useState } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

interface AuthProps {
  children?: React.ReactNode;
}

interface AuthContextType {
  user: string | null;
}

const AuthContext = createContext<AuthContextType>({ user: "" });

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const signInWithGoogle = async () => {};
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com"
  });

  return (
    <AuthContext.Provider value={{ user: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
