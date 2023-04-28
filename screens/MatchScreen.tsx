import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
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
    <View className="h-full bg-red-500 pt-20" style={{ opacity: 0.89 }}>
      <View className="justify-center px-10 pt-20">
        <Image source={{ uri: "https://links.papareact.com/mg9" }} />
      </View>

      <Text className="text-white text-center mt-5">
        You & {userSwiped.displayName} Have Liked Each Other.
      </Text>
    </View>
  );
};

export default MatchScreen;
