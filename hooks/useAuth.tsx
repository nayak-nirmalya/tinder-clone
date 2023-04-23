import React, { createContext, useContext, useEffect } from "react";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import {
  ANDROID_OAUTH_CLIENT_ID_FIREBASE,
  IOS_OAUTH_CLIENT_ID_FIREBASE,
  EXPO_CLIENT_ID
} from "@env";
import { AuthSessionResult } from "expo-auth-session";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut
} from "firebase/auth";
import { auth } from "../firebase";

interface AuthProps {
  children?: React.ReactNode;
}

interface AuthContextType {
  user: string | null;
  promptAsync: () => Promise<AuthSessionResult>;
  signInWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: "",
  signInWithGoogle: () => {},
  promptAsync: () => new Promise(() => {})
});

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_OAUTH_CLIENT_ID_FIREBASE,
    iosClientId: IOS_OAUTH_CLIENT_ID_FIREBASE,
    expoClientId: EXPO_CLIENT_ID,
    scopes: ["profile", "email"]
  });

  const signInWithGoogle = async () => {
    if (response?.type === "success") {
      const { idToken, accessToken } = response.authentication!;
      const credential = GoogleAuthProvider.credential(idToken, accessToken);

      await signInWithCredential(auth, credential);

      try {
        const userInfo = await fetch(
          "https://www.googleapis.com/userinfo/v2/me?prettyPrint=true&fields=email,name,gender,id,link,locale,picture,family_name,given_name,hd,verified_email",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        const user = await userInfo.json();
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    }

    // return Promise.reject();
  };

  useEffect(() => {
    if (!response) return;

    signInWithGoogle();
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user: null,
        signInWithGoogle,
        promptAsync
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
