import React, { useLayoutEffect } from "react";
import { View, Text, Button, ImageBackground } from "react-native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";

const LogInScreen = () => {
  const { user, loading, onGoogleButtonPress, signOut } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  // if (!user) {
  //   return (
  //     <View className="flex flex-row justify-center">
  //       {loading ? (
  //         <Text>Loading...</Text>
  //       ) : (
  //         <GoogleSigninButton
  //           className="mx-auto mt-56"
  //           onPress={onGoogleButtonPress}
  //         />
  //       )}
  //     </View>
  //   );
  // }

  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1"
        resizeMode="cover"
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <Text>Hi, There!</Text>
      </ImageBackground>
    </View>
  );
};

export default LogInScreen;
