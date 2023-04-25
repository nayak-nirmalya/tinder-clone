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
      <View>
        <TouchableOpacity>
          <Image
            className="h-10 w-10 rounded-full"
            source={{
              uri: user?.photoURL!
            }}
          />
        </TouchableOpacity>
      </View>
      {/* END OF HEADER */}

      <Button title="Chat" onPress={() => navigation.navigate("Chat")} />
      <Button title="Sign Out" onPress={signOut} />
    </SafeAreaView>
  );
};

export default HomeScreen;
