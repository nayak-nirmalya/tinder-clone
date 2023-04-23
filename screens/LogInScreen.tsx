import React from "react";
import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

const LogInScreen = () => {
  const { promptAsync, signInWithGoogle, user } = useAuth();

  return (
    <SafeAreaView className="bg-gray-500">
      <Text className="text-xl text-center text-black">LogInScreen</Text>
      <Button title="Sign In!" onPress={() => promptAsync()} />
    </SafeAreaView>
  );
};

export default LogInScreen;
