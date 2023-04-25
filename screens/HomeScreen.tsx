import React from "react";
import Swiper from "react-native-deck-swiper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";

import useAuth from "../hooks/useAuth";

const DUMMY_DATA = [
  {
    firstName: "Nirmalya",
    lastName: "Nayak",
    age: 25,
    occupation: "Software Developer",
    photoURL: "https://i.redd.it/fbvdmvpf3qv81.jpg"
  },
  {
    firstName: "Swadesh",
    lastName: "Nayak",
    age: 26,
    occupation: "IAS",
    photoURL:
      "https://qph.cf2.quoracdn.net/main-qimg-4920a745d6ed136ca5155062f6037197"
  },
  {
    firstName: "Saroj",
    lastName: "Kumar",
    age: 25,
    occupation: "Teacher",
    photoURL:
      "https://media.sciencephoto.com/image/f0283895/800wm/F0283895-Portrait_male_high_school_teacher_in_classroom.jpg"
  },
  {
    firstName: "Kiara",
    lastName: "Advani",
    age: 30,
    occupation: "Software Developer",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Kiara_Advani_walks_for_Shyamal-Bhumika_at_India_Couture_Week_2018_Day_4_%2803%29_%28cropped%29.jpg"
  }
];

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

      {/* CARD */}
      <Swiper
        cards={DUMMY_DATA}
        renderCard={(card) => (
          <View>
            <Text>{card.firstName}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
