import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import useFetch from "../hooks/useFetch";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import PopularJobCard from "./PopularJobCard";
import NearbyJobCard from "./NearbyJobCard";
import {Feather} from '@expo/vector-icons'

type Props = {};

const NearbyJobs = (props: Props) => {
  const { navigate, push } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, isLoading, error, refetch} = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });
  return (
    <View>
      <Text></Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-medium mb-2">Nearby jobs</Text>
        <TouchableOpacity 
        onPress={refetch}
        >
          <Feather name='refresh-ccw' className='text-red-400' size={24} color='gray'/>
          {/* <Text>show all</Text> */}
        </TouchableOpacity>
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color="gray" />
        ) : error ? (
          <Text className="text-red-400 animate-pulse">Something went wrong!!</Text>
        ) : (
          data?.map((item) => (
            <NearbyJobCard 
            job={item}
            key={`nearby-job${item.job_id}`}
            handleNavigate={() => push('jobDetailScreen', {item})}
            />
          ))
         
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
