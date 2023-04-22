import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, TouchableOpacity } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Chat" onPress={() => navigation.navigate("Chat")} />
    </View>
  );
};

export default HomeScreen;
