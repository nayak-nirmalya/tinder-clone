import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";

import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView>
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-4 pt-2">
        <TouchableOpacity
          className="border-2 border-[#FF5864] rounded-full"
          onPress={signOut}
        >
          <Image
            className="h-10 w-10 rounded-full border-2"
            source={{
              uri: user?.photoURL!
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            className="h-12 w-10 rounded-full"
            source={require("../assets/tinder_logo.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={42} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* END OF HEADER */}
    </SafeAreaView>
  );
};

export default HomeScreen;
