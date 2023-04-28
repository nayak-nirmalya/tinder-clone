import React from "react";
import { View, Text } from "react-native";

import { Match } from "../lib/typesInterfaces";

export interface ChatRowProps {
  matchDetails: Match;
}

const ChatRow: React.FC<ChatRowProps> = ({ matchDetails }) => {
  return (
    <View>
      <Text>{matchDetails.usersMatched}</Text>
    </View>
  );
};

export default ChatRow;
