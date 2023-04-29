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
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import getUserById from "../lib/getMatchedUserInfo";
import { RootStackParamList } from "../StackNavigator";
import { Match, Profile } from "../lib/typesInterfaces";

export interface MessageScreenProps {
  matchDetails: Match;
}

type MessageProps = NativeStackScreenProps<RootStackParamList, "Message">;

const MessageScreen = ({ route, navigation }: MessageProps) => {
  const { user } = useAuth();
  const { matchDetails } = route.params;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [matchedUserInfo, setMatchedUserInfo] = useState<Profile>();

  const sendMessage = () => {};

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
            data={message}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) => {
              message.userId === user?.uid ? (
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
