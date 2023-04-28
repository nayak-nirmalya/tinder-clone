import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Profile } from "./HomeScreen";
import { RootStackParamList } from "../StackNavigator";

export interface MatchScreenProps {
  loggedInProfile: Profile;
  userSwiped: Profile;
}

type MatchedProps = NativeStackScreenProps<RootStackParamList, "Match">;

const MatchScreen = ({ route, navigation }: MatchedProps) => {
  const { loggedInProfile, userSwiped } = route.params;

  return (
    <View className="h-full bg-red-500 pt-14" style={{ opacity: 0.92 }}>
      <View className="justify-center px-10 pt-16">
        <Image
          className="h-20 w-full"
          source={{ uri: "https://links.papareact.com/mg9" }}
        />
      </View>

      <Text className="text-white text-center mt-12 font-semibold">
        You & {userSwiped.displayName} Have Liked Each Other.
      </Text>

      <View className="flex-row justify-evenly mt-6">
        <Image
          className="h-32 w-32 rounded-full"
          source={{
            uri: loggedInProfile.photoURL
          }}
        />
        <Image
          className="h-32 w-32 rounded-full"
          source={{
            uri: userSwiped.photoURL
          }}
        />
      </View>

      <TouchableOpacity
        className="
          bg-white
          m-14 mt-56
          px-6 py-4
          rounded-full
        "
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text className="text-center font-bold text-md">Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
