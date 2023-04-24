import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  GoogleSignin,
  GoogleSigninButton
} from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const LogInScreen = () => {
  GoogleSignin.configure({
    webClientId:
      "764700743220-9l8icu5lr1b1h0uqlj6dqoghv4l3ht03.apps.googleusercontent.com"
  });

  const {} = useAuth();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  const onAuthStateChanged = (user: FirebaseAuthTypes.User) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userSignIn = auth().signInWithCredential(googleCredential);
    userSignIn
      .then((userInfo) => console.log(userInfo))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // @ts-ignore
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <GoogleSigninButton onPress={onGoogleButtonPress} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Text className="text-xl text-center mt-32 mb-40 text-black">
        Welcome {user.displayName}
      </Text>
      <Button title="Sign Out!" onPress={signOut} />
    </SafeAreaView>
  );
};

export default LogInScreen;
