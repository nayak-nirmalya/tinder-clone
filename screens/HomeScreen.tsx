import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Chat" onPress={() => navigation.navigate("Chat")} />
      <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
        <Text>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
