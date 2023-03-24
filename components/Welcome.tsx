import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { NativeStackScreenProps, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = {
  searchQuery: string
  setSearchQuery:  React.Dispatch<React.SetStateAction<string>>
  handleClick: () => void
} 


const jobTypes = ["Full-time", "Part-time", "Contractor", "Freelancer", "Bulk Project"]

const Welcome = ({ searchQuery, setSearchQuery, handleClick }: Props) => {
  const [activeJobType, setActiveJobType] = useState("Full-timej")
  const {navigate, push} = useNavigation<NativeStackNavigationProp<RootStackParamList, 'search'>>()

  return (
    <View>
      <Text className="text-2xl ">Hello,</Text>
      <Text className="text-3xl font-bold mb-4">Find your perfect job</Text>

      {/* Search */}
      <View className="flex-row mb-4 space-x-2 items-center">
        <View className="flex-grow">
          <TextInput
            className="rounded px-6 py-2 bg-gray-200 transition focus:border focus:bg-transparent"
            placeholder="Search for jobs"
            returnKeyType="search"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <TouchableOpacity
        onPress={() => handleClick()}
          activeOpacity={0.5}
          className="bg-orange-400 p-2 rounded"
        >
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* job listings */}
      <View className="">
        <FlatList 
        data={jobTypes}
        renderItem={({item}) => (
          <TouchableOpacity
          onPress={() => {
            setActiveJobType(item)
            push("search", {item: `${item}`})
          }}
          className={ `p-2 rounded-lg border mb-2 opacity-40 ${activeJobType === item ? 'opacity-100' : ''} `}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        contentContainerStyle={{ columnGap: 5}}
        horizontal
        />

      </View>
    </View>
  );
};

export default Welcome;
