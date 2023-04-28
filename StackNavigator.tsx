import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LogInScreen from "./screens/LogInScreen";
import ModalScreen from "./screens/ModalScreen";
import MatchScreen, { MatchScreenProps } from "./screens/MatchScreen";

import useAuth from "./hooks/useAuth";

export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  LogIn: undefined;
  Modal: undefined;
  Match: MatchScreenProps;
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
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Group>

          <Stack.Group
            screenOptions={{ presentation: "containedTransparentModal" }}
          >
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>

          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="Match" component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="LogIn" component={LogInScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
