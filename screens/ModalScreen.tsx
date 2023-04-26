import { View, Image, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { user } = useAuth();

  return (
    <View
      className="
            mt-10 bg-white 
            h-full w-full 
            rounded-xl 
            pt-1 flex-1 
            items-center
        "
    >
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />

      <Text className="text-xl text-gray-500 font-bold p-2">
        Welcome {user?.displayName}
      </Text>
    </View>
  );
};

export default ModalScreen;
