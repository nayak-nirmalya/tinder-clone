import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

import useAuth from "../hooks/useAuth";
import getUserById from "../lib/getMatchedUserInfo";
import { Match, Profile } from "../lib/typesInterfaces";

export interface ChatRowProps {
  matchDetails: Match;
}

const ChatRow: React.FC<ChatRowProps> = ({ matchDetails }) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [matchedUserInfo, setMatchedUserInfo] = useState<Profile>();

  useEffect(() => {
    (async function () {
      const otherUserId = matchDetails.usersMatched.filter(
        (id) => id !== user?.uid
      );
      setMatchedUserInfo(await getUserById(otherUserId[0]));
    })();
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
      onPress={() => navigation.navigate("Message", { matchDetails })}
    >
      {matchedUserInfo?.photoURL && (
        <Image
          source={{
            uri: matchedUserInfo.photoURL
          }}
          className="rounded-full h-16 w-16 mr-4"
        />
      )}

      <View>
        <Text className="text-lg font-semibold">
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{"Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
