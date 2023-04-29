import { View, Text } from "react-native";
import React from "react";

export interface SenderMessageProps {
  message: any;
}

const SenderMessage: React.FC<SenderMessageProps> = ({ message }) => {
  return (
    <View>
      <Text>SenderMessage</Text>
    </View>
  );
};

export default SenderMessage;
