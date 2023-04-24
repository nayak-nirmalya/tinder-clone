import StackNavigator from "./StackNavigator";

import { AuthProvider } from "./hooks/useAuth";

import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";

import "expo-dev-client";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
