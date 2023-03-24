import { View, Text } from 'react-native'
import React from 'react'

type Props = {
  info: string
}

export default function JobAbout({info}: Props) {
  return (
    <View>
      <Text className='mt-4 mb-2 font-medium text-lg'>About the job:</Text>
      <View>
      <Text className='text-gray-500'>{info}</Text>
      </View>
    </View>
  )
}