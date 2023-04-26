import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Swiper from "react-native-deck-swiper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Image } from "react-native";

import useAuth from "../hooks/useAuth";
import firestore, {
  FirebaseFirestoreTypes
} from "@react-native-firebase/firestore";

export interface Profile {
  id: string;
  displayName: string;
  age: string;
  job: string;
  photoURL: string;
  timestamp: FirebaseFirestoreTypes.FieldValue;
}

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const swipeRef = useRef(null);

  useEffect(() => {
    let unsub;

    const getUserData = async () => {
      try {
        unsub = firestore()
          .collection("Users")
          .onSnapshot((documentSnapshot) => {
            setProfiles(
              documentSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
              })) as Profile[]
            );
          });

        console.log(profiles);

        // const users = (await firestore().collection("Users").get()).docs.map(
        //   (doc) => doc.data()
        // );

        // setProfiles(users as Profile[]);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
    return unsub;
  }, []);

  useLayoutEffect(() => {
    const getUserData = async () => {
      try {
        const subscriber = firestore()
          .collection("Users")
          .doc(user?.uid)
          .onSnapshot((documentSnapshot) => {
            if (!documentSnapshot.exists) {
              navigation.navigate("Modal");
            }
          });

        // Stop listening for updates when no longer required
        return () => subscriber();
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-4 pt-4">
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

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
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

      {/* CARD */}
      <View className="flex-1 mt-2">
        <Swiper
          containerStyle={{
            backgroundColor: "transparent"
          }}
          ref={swipeRef}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          stackSize={5}
          cards={profiles}
          backgroundColor="#4FD0E9"
          onSwipedLeft={() => {
            console.log("Swipe PASS!");
          }}
          onSwipedRight={() => {
            console.log("Swipe MATCH!");
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red"
                }
              }
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30"
                }
              }
            }
          }}
          renderCard={(profile) =>
            profile ? (
              <View
                key={profile.id}
                className="bg-white h-3/4 rounded-xl relative"
              >
                <Image
                  className="h-full w-full rounded-xl absolute top-0"
                  source={{ uri: profile.photoURL }}
                />

                <View
                  className="
                  bg-white
                  w-full py-2
                  h-20 px-6
                  absolute
                  bottom-0
                  justify-between
                  items-center
                  flex-row
                  rounded-b-xl
                  shadow-2xl
                "
                >
                  <View className="mt-2">
                    <Text className="text-xl font-bold">
                      {profile.displayName}
                    </Text>
                    <Text>{profile.job}</Text>
                  </View>

                  <Text className=" mt-3 text-2xl font-bold">
                    {profile.age}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                className="
                  relative
                  bg-white
                  h-3/4
                  rounded-xl
                  justify-center
                  items-center
                  shadow-2xl
                "
              >
                <Text className="font-bold text-lg pb-12">
                  No More Profiles :(
                </Text>

                <Image
                  className="h-96 w-full"
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
        />
      </View>

      <View className="flex flex-row justify-evenly mb-5">
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            swipeRef.current!.swipeLeft();
          }}
          className="
            items-center 
            justify-center 
            rounded-full 
            w-16 h-16 
            bg-red-200
          "
        >
          <Entypo name="cross" size={32} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            swipeRef.current!.swipeRight();
          }}
          className="
            items-center 
            justify-center 
            rounded-full 
            w-16 h-16 
            bg-green-200
          "
        >
          <AntDesign name="heart" size={32} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
