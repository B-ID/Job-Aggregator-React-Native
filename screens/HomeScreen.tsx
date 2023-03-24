import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParamList } from '../App'
import { NearbyJobs, PopularJobs, Welcome } from '../components'

type Props = {}

// onboarding screen

const HomeScreen = ({}: Props) => {
    const {navigate, push} = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [searchQuery, setSearchQuery] = useState("")

  return (

    <ScrollView 
    showsVerticalScrollIndicator={false}
     className='flex-1 bg-gray-50 px-4'
     >
        <SafeAreaView>
            {/* Welcome */}
            <Welcome  
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleClick={() => {
              if (searchQuery !== null) {
               push('search', {item: searchQuery}) 
              }
            }}
            />


            {/* PopularJobs */}
            <PopularJobs/>


            {/* NearBy Jobs */}
            <NearbyJobs />

        </SafeAreaView>
    </ScrollView>
  )
}

export default HomeScreen
