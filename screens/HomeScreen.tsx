import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView>
      {/* HEADER */}
      <View className="items-center relative">
        <TouchableOpacity className="absolute left-5 top-3">
          <Image
            className="h-10 w-10 rounded-full"
            source={{
              uri: user?.photoURL!
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity className="top-3">
          <Image
            className="h-10 w-10 rounded-full"
            source={require("../assets/tinder_logo.png")}
          />
        </TouchableOpacity>
      </View>
      {/* END OF HEADER */}
    </SafeAreaView>
  );
};

export default HomeScreen;
