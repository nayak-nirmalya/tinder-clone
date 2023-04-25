import React from "react";
import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

const LogInScreen = () => {
  const { user, initializing, onGoogleButtonPress, signOut } = useAuth();

  if (initializing) return null;

  if (!user) {
    return (
      <View className="flex flex-row justify-center">
        <GoogleSigninButton
          className="mx-auto mt-56"
          onPress={onGoogleButtonPress}
        />
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
