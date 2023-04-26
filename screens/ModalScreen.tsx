import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";

import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [job, setJob] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = async () => {
    // const usersCollection = firestore().collection('Users');

    // const users = await firestore().collection('Users').get();
    // const userInfo = await firestore().collection('Users').doc(user?.uid).get();

    firestore()
      .collection("Users")
      .doc(user?.uid)
      .set({
        id: user?.uid,
        displayName: user?.displayName,
        photoURL: image || user?.photoURL,
        job: job,
        age: age,
        timestamp: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log("User Added!");
        navigation.navigate("Home");
      })
      .catch((err) => console.error(err));

    // firestore()
    // .collection('Users')
    // .doc('ABC')
    // .update({
    //     age: 31,
    // })
    // .then(() => {
    //     console.log('User updated!');
    // });

    // firestore()
    // .collection('Users')
    // .doc('ABC')
    // .delete()
    // .then(() => {
    //     console.log('User deleted!');
    // });
  };

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
        value={image}
        onChangeText={setImage}
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
        value={job}
        onChangeText={setJob}
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
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        onPress={updateUserProfile}
        className={`
            w-64 p-3 
            rounded-xl 
            absolute
            bottom-6 
            ${incompleteForm ? "bg-gray-400" : "bg-red-400"}
        `}
      >
        <Text className="text-center text-white text-xl">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
