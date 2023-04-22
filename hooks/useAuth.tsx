import { View, Text, Button } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { GOOGLE_OAUTH_CLIENT_ID, EXPO_CLIENT_ID } from "@env";

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
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_OAUTH_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID
  });

  const getUserInfo = async (token: string) => {
    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const tempFun = async () => {
      if (response?.type === "success") {
        await getUserInfo(response.authentication?.accessToken!);
      }
    };

    tempFun();
  }, [response]);

  return (
    // <AuthContext.Provider value={{ user: null }}>
    //   {children}
    // </AuthContext.Provider>
    <View>
      <Text>Nirmalya</Text>
      <Text>{JSON.stringify(userInfo)}</Text>
      <Button title="Sign In with Google" onPress={() => promptAsync()} />
    </View>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
