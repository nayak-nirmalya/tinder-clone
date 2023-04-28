import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

import useAuth from "../hooks/useAuth";
import { Match } from "../lib/typesInterfaces";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

export interface ChatRowProps {
  matchDetails: Match;
}

const ChatRow: React.FC<ChatRowProps> = ({ matchDetails }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user?.uid!));
  }, [matchDetails, user]);

  return (
    <TouchableOpacity
      className="
        flex-row 
        items-center 
        py-3 px-5 
        bg-white 
        mx-3 my-1 
        rounded-lg
      "
    >
      <Image
        source={{
          uri: matchedUserInfo?.photoURL!
        }}
        className="rounded-full h-16 w-16 mr-4 shadow-2xl"
      />
    </TouchableOpacity>
  );
};

export default ChatRow;
