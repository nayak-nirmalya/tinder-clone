import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

interface HeaderProps {
  title: string;
  callEnabled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, callEnabled = false }) => {
  const navigation = useNavigation();

  return (
    <View className="p-2 flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold pl-2">{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity
          className="rounded-full mr-4 p-3 bg-red-200"
          onPress={() => {}}
        >
          <Foundation name="telephone" size={20} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
