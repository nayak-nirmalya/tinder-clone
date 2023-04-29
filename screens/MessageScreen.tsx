import {
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList
} from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import useAuth from "../hooks/useAuth";
import getUserById from "../lib/getMatchedUserInfo";
import { RootStackParamList } from "../StackNavigator";
import { Match, Message, Profile } from "../lib/typesInterfaces";

import Header from "../components/Header";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";

export interface MessageScreenProps {
  matchDetails: Match;
}

type MessageProps = NativeStackScreenProps<RootStackParamList, "Message">;

const MessageScreen = ({ route, navigation }: MessageProps) => {
  const { user } = useAuth();
  const { matchDetails } = route.params;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [matchedUserInfo, setMatchedUserInfo] = useState<Profile>();

  const sendMessage = async () => {
    const otherUserId = matchDetails.usersMatched.filter(
      (id) => id === user?.uid
    );
    const photoURL = (await getUserById(otherUserId[0])).photoURL;

    firestore()
      .collection("Matches")
      .doc(matchDetails.id)
      .collection("Messages")
      .add({
        userId: user?.uid,
        displayName: user?.displayName,
        photoURL,
        message: input,
        timestamp: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        setInput("");
        console.log("Message Added to Collection!");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    return firestore()
      .collection("Matches")
      .doc(matchDetails.id)
      .collection("Messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((documentSnapshot) => {
        setMessages(
          documentSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })) as Message[]
        );
      });
  }, [matchDetails]);

  useEffect(() => {
    (async function () {
      const otherUserId = matchDetails.usersMatched.filter(
        (id) => id === user?.uid
      );
      setMatchedUserInfo(await getUserById(otherUserId[0]));
    })();
  }, [matchDetails, user]);

  return (
    <SafeAreaView className="flex-1">
      <Header title={matchedUserInfo?.displayName || "User"} callEnabled />

      <KeyboardAvoidingView
        className="flex-1"
        keyboardVerticalOffset={10}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            className="pl-4"
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) => {
              return message.userId === user?.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              );
            }}
          />
        </TouchableWithoutFeedback>

        <View
          className="
        flex-row
        bg-white
        justify-between
        items-center
        border-t
        border-gray-200
        px-5 py-2
        "
        >
          <TextInput
            className="h-10 text-lg"
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button title="Send" color="#FF5864" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
