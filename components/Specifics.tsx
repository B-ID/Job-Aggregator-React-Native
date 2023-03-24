import { View, Text } from 'react-native'
import React from 'react'
type Props = {
  title: string
  points: string[]
}

export default function Specifics({title, points}: Props) {
  return (
    <View>
      <Text className='font-medium text-lg mt-4 mb-2'>{title}:</Text>

      <View className='space-y-2'>
        {points.map((item, i) => (
          <View key={item + i}>
            <Text className='text-gray-500'>{`\u2023 ${item}.`}</Text>
          </View>
        ))}

      </View>
    </View>
  )
}