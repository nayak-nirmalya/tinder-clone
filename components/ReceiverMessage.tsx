import { View, Text } from "react-native";
import React from "react";

export interface ReceiverMessageProps {
  message: any;
}

const ReceiverMessage: React.FC<ReceiverMessageProps> = ({ message }) => {
  return (
    <View>
      <Text>ReceiverMessage</Text>
    </View>
  );
};

export default ReceiverMessage;
