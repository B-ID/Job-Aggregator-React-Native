import { useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

type Props = {
  tabs: string[]
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

type ITabProps = {
  name: string
  activeTab: string
  onHandleSearchType: () => void
}

function TabButton({name, activeTab, onHandleSearchType}: ITabProps){
  return (
    <TouchableOpacity
    className={`p-3 rounded ${activeTab === name ? ' bg-orange-400' : 'bg-gray-100'} `}
    onPress={onHandleSearchType}
    >
      <Text className={`${activeTab === name ? 'font-medium text-white' : ''}`}>{name}</Text>
    </TouchableOpacity>

  )
}

export default function JobTabs({tabs, activeTab, setActiveTab}: Props) {
  useEffect(() => {
    setActiveTab("About")
  }, [])
  

  return (
    <View className='items-center'>
      <FlatList 
      data={tabs}
      renderItem={({item}) => (
        <TabButton 
        name={item}
        activeTab={activeTab}
        onHandleSearchType={() => setActiveTab(item)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item}
      contentContainerStyle={{ columnGap: 10}}
      />
    </View>
  )
}