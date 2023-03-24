import { View, Text, Image, TouchableOpacity, Linking, AccessibilityInfo } from 'react-native'
import {AntDesign} from '@expo/vector-icons'

type Props = {
  url: string
  isLoading: boolean
}

export default function JobFooter({url, isLoading}: Props) {
  return (
    <View className='bg-gray-800'>
      {!isLoading && 
      <View className='p-4 flex-row gap-2 items-center'>
        <TouchableOpacity activeOpacity={0.5}>
          {/* <AntDesign name='hearto' size={24} color='red'/> */}
        </TouchableOpacity>
        <TouchableOpacity 
        className='bg-orange-400 rounded px-4 py-2 flex-1'
        activeOpacity={0.5}
        onPress={() => Linking.openURL(url)}
        >
          <Text className='font-medium text-white text-lg text-center'>Apply for job</Text>
        </TouchableOpacity>
        </View>}
    </View>
      )
}