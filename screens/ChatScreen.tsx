import React, { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import firestore, {
  FirebaseFirestoreTypes
} from "@react-native-firebase/firestore";

import { Profile } from "./HomeScreen";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import ChatList from "../components/ChatList";

interface Match {
  id: string;
  users: Profile[];
  usersMatched: string[];
  timestamp: FirebaseFirestoreTypes.FieldValue;
}

const ChatScreen = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    firestore()
      .collection("Matches")
      .where("usersMatched", "array-contains", user?.uid)
      .get()
      .then((snapshot) =>
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })) as Match[]
        )
      );
  }, []);

  return (
    <SafeAreaView>
      <Header title="Chat" callEnabled />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
