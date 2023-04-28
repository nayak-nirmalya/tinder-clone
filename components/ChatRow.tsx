import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

import useAuth from "../hooks/useAuth";
import { Match } from "../lib/typesInterfaces";

export interface ChatRowProps {
  matchDetails: Match;
}

const ChatRow: React.FC<ChatRowProps> = ({ matchDetails }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {}, []);

  return <TouchableOpacity></TouchableOpacity>;
};

export default ChatRow;
