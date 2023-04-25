import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";

import useAuth from "../hooks/useAuth";

const LogInScreen = () => {
  const { loading, onGoogleButtonPress } = useAuth();

  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1"
        resizeMode="cover"
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          onPress={onGoogleButtonPress}
          style={{ marginHorizontal: "25%" }}
          className="absolute bottom-40 w-52 bg-white p-4 rounded-2xl"
        >
          {loading ? (
            <Text className="text-center font-semibold text-lg">
              Loading...
            </Text>
          ) : (
            <Text className="text-center font-semibold text-lg">
              Sign In & Get Swiping!
            </Text>
          )}
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LogInScreen;
