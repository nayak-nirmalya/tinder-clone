import firestore, {
  FirebaseFirestoreTypes
} from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, FlatList } from "react-native";

import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import { Profile } from "../screens/HomeScreen";

interface Match {
  id: string;
  users: Profile[];
  usersMatched: string[];
  timestamp: FirebaseFirestoreTypes.FieldValue;
}

const ChatList = () => {
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
  }, [user?.uid]);

  return matches.length > 0 ? (
    <FlatList />
  ) : (
    <View className="p-6">
      <Text className="text-center text-lg">No Matches At the Moment. :(</Text>
    </View>
  );
};

export default ChatList;
