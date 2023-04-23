import React from "react";
import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";

const LogInScreen = () => {
  const { promptAsync, signInWithGoogle, user } = useAuth();

  return (
    <View>
      <Text>LogInScreen</Text>
      <Button title="Sign In!" onPress={() => promptAsync()} />
    </View>
  );
};

export default LogInScreen;
