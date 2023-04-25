import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Chat" onPress={() => navigation.navigate("Chat")} />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default HomeScreen;
