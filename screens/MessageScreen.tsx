import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import React from "react";

import Header from "../components/Header";
import { Match } from "../lib/typesInterfaces";
import { RootStackParamList } from "../StackNavigator";

export interface MessageScreenProps {
  matchDetails: Match;
}

type MessageProps = NativeStackScreenProps<RootStackParamList, "Message">;

const MessageScreen = ({ route, navigation }: MessageProps) => {
  const { matchDetails } = route.params;

  return (
    <View>
      <Header title="Message" callEnabled />
      <Text>MessageScreen</Text>
    </View>
  );
};

export default MessageScreen;
