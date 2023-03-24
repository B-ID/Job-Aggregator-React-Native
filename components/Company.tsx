import { View, Text, Image, Share, Alert } from 'react-native'
import { checkImageUrl } from '../util/checkImageUrl'
import {AntDesign, Feather}  from '@expo/vector-icons'

type Props = {
  companyLogo: string
  jobTitle: string
  companyName: string
  location: string
}



export default function Company({companyLogo, jobTitle, companyName, location}: Props) {
  return (
    <View>
      {/* logo container */}
      <View>
        <Image 
        className='h-32'
        source={{
            uri: checkImageUrl(companyLogo) ? companyLogo : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'
        }}
        resizeMode="contain"
        />
        <View>
          <Text className='font-medium text-2xl text-center'>{jobTitle}</Text>
          <Text className='text-lg text-gray-500 text-center mb-2'>{companyName} / 
          {' '}
            <Feather name='map-pin' size={20} color='orange'/>
            {' '} 
            {location}
          </Text>

        </View>

      </View>
    </View>
  )
}