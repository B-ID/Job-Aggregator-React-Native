import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import PopularJobCard from './PopularJobCard'
import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import {Feather} from '@expo/vector-icons'

type Props = {}

const PopularJobs = ({}: Props) => {
  const {navigate, push} = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {data, isLoading, error, refetch } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  })


  return (
    <View>
      <Text>

      </Text>
      <View className='flex-row items-center justify-between'>
        <Text className='text-lg mb-2 font-medium'>Popular jobs</Text>
        <TouchableOpacity
        onPress={refetch}
        >

          {/* <Text>show all</Text> */}
          <Feather name='refresh-ccw' className='text-red-400' size={24} color='gray'/>
        </TouchableOpacity>
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color='gray' />
        ) : error ? (
          <Text className='text-lg text-red-500 animate-pulse'>Something went wrong!!</Text>
        ) : (
          <FlatList 
          data={data}
          renderItem={({ item }) => (
            <PopularJobCard 
            item={item}
            selectedJob={() => console.log(item)}
            handleCardPress={() => push('jobDetailScreen', {item})}
            />
          )}
          keyExtractor={item => item?.job_id}
          contentContainerStyle={{ columnGap: 5}}
          horizontal
          />
        )
          

        }

      </View>
    </View>
  )
}

export default PopularJobs