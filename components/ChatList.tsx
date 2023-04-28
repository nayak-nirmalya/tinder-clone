import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import ChatRow from "./ChatRow";
import useAuth from "../hooks/useAuth";
import { Match } from "../lib/typesInterfaces";

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
    <FlatList
      className="h-full"
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View className="p-6">
      <Text className="text-center text-lg">No Matches At the Moment. :(</Text>
    </View>
  );
};

export default ChatList;
