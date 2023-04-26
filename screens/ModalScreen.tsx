import React from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";

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

      <Text className="text-center font-bold p-4 text-red-400">
        Step 1: The Profile Picture
      </Text>
      <TextInput
        className="
            border py-2
            rounded-full
            text-center 
            text-xl px-6
            border-rose-400
        "
        placeholder="Enter Profile Picture URL"
      />

      <Text className="text-center font-bold p-4 text-red-400">
        Step 2: The Job
      </Text>
      <TextInput
        className="
            border py-2
            rounded-full
            text-center 
            text-xl px-6
            border-rose-400
        "
        placeholder="Enter Your Occupation"
      />

      <Text className="text-center font-bold p-4 text-red-400">
        Step 3: The Age
      </Text>
      <TextInput
        className="
            border py-2
            rounded-full
            text-center 
            text-xl px-6
            border-rose-400
        "
        placeholder="Enter Your Age"
      />

      <TouchableOpacity
        className="
            w-64 p-3 
            rounded-xl 
            absolute 
            bottom-6 
            bg-red-400
        "
      >
        <Text className="text-center text-white text-xl">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
