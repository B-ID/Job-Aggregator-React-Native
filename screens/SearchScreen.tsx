import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Util } from "../util/Util";
import NearbyJobCard from "../components/NearbyJobCard";
import { JobData } from "../components/PopularJobCard";
import {AntDesign} from '@expo/vector-icons'

type Props = NativeStackScreenProps<RootStackParamList, "search">;

export default function SearchScreen({ navigation: { push} ,route: { params } }: Props) {
  const [searchResult, setSearchResult] = useState<JobData[]>([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers: {
          "X-RapidAPI-Key": `${Util.API_KEY}`,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
          query: params.item,
          page: page.toString(),
        },
      };

      const response = await axios.request(options);
      setSearchResult(response.data.data);
    } catch (error: any) {
      setSearchError(error.message);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction: string) => {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === "right") {
      setPage(page + 1);
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <View className="flex-1 bg-white px-4">
      <FlatList 
      data={searchResult}
      renderItem={({ item }) => (
        <NearbyJobCard 
        job={item}
        key={`nearby-jobs${item.job_id}`}
        handleNavigate={() => push('jobDetailScreen',  {item} ) }
        />

      )}
      keyExtractor={(item) => item.job_id}
      contentContainerStyle={{ rowGap: 6, padding: 4}}
      ListHeaderComponent={() => (
        <>
        <View className="mb-4">
          <Text className="text-2xl font-medium">{params.item}</Text>
          <Text className="text-gray-500">Job Opportunities</Text>
        </View>
        <View className="">
          {searchLoader ? (
            <ActivityIndicator size="large" color='orange' />
          ) : searchError ? (
            <Text className="text-lg text-red-500 animate pulse">Oops something went wrong!!</Text>
          ) : searchResult.length === 0 ? (
            <Text className="text-xl text-gray-500 italic...">No Search results</Text>
          ) : ''
          }
        </View>
        
        </>
      )}
      ListFooterComponent={() => (
        <>
        <View className="flex-row justify-center items-center gap-3">
          <TouchableOpacity
         onPress={() => handlePagination('left')} 
          >
          <AntDesign name="arrowleft" size={24} color='orange' />  
          </TouchableOpacity>

          <View className="p-4">
            <Text>{page}</Text>
          </View>

          <TouchableOpacity
         onPress={() => handlePagination('right')} 
          >
          <AntDesign name="arrowright" size={24} color='orange' />  
          </TouchableOpacity>
        </View>
        
        </>
      )}
      />

    </View>
  );
}
