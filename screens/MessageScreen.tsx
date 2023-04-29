import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import getUserById from "../lib/getMatchedUserInfo";
import { RootStackParamList } from "../StackNavigator";
import { Match, Profile } from "../lib/typesInterfaces";

export interface MessageScreenProps {
  matchDetails: Match;
}

type MessageProps = NativeStackScreenProps<RootStackParamList, "Message">;

const MessageScreen = ({ route, navigation }: MessageProps) => {
  const { user } = useAuth();
  const { matchDetails } = route.params;
  console.log(matchDetails, user);
  const [matchedUserInfo, setMatchedUserInfo] = useState<Profile>();

  useEffect(() => {
    (async function () {
      const otherUserId = matchDetails.usersMatched.filter(
        (id) => id === user?.uid
      );
      setMatchedUserInfo(await getUserById(otherUserId[0]));
    })();
  }, [matchDetails, user]);

  return (
    <SafeAreaView>
      <Header title={matchedUserInfo?.displayName || "User"} callEnabled />
      <Text>MessageScreen</Text>
    </SafeAreaView>
  );
};

export default MessageScreen;
