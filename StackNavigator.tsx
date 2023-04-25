import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LogInScreen from "./screens/LogInScreen";

import useAuth from "./hooks/useAuth";

export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  LogIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <Stack.Screen name="LogIn" component={LogInScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
