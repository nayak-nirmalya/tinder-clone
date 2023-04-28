import React from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Profile } from "./HomeScreen";
import { RootStackParamList } from "../StackNavigator";

export interface MatchScreenProps {
  loggedInProfile: Profile;
  userSwiped: Profile;
}

type MatchedProps = NativeStackScreenProps<RootStackParamList, "Match">;

const MatchScreen = ({ route, navigation }: MatchedProps) => {
  //   const navigation = useNavigation();
  //   const { params } = useRoute<RootStackParamList>();

  const { loggedInProfile, userSwiped } = route.params;

  return (
    <View>
      <Text>{loggedInProfile.displayName}</Text>
      <Text>{userSwiped.displayName}</Text>
    </View>
  );
};

export default MatchScreen;
