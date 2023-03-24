import { Alert, Share} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import { AntDesign, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import JobDetailsScreen from "./screens/JobDetailsScreen";
import { JobData } from "./components/PopularJobCard";
import SearchScreen from "./screens/SearchScreen";

export type RootStackParamList = {
  home: undefined;
  search: {
    item: string;
  };
  jobDetailScreen: {
    item: JobData;
  };
};

export type JobStackParamList = {
  jobDetailScreen: undefined;
};

// function JobDetailStackNavigator() {
//   const {Navigator, Screen} = createNativeStackNavigator<JobStackParamList>()

//   return (
//     <Navigator
//     initialRouteName="jobDetailScreen"
//     >
//       <Screen name="jobDetailScreen" component={JobDetailsScreen} />

//     </Navigator>
//   )

// }

const Stack = createNativeStackNavigator();


async function shareJobLink() {
  try {
    const result = await Share.share({
      message: 'This is a test message'
    })
  } catch (error: any) {
    Alert.alert(error.message)
  }

}

export default function App() {

  const { Navigator, Screen } = Stack;
  return (
    <NavigationContainer>
      <Navigator initialRouteName="home">
        <Screen
          name="home"
          component={HomeScreen}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerShown: false,
            // headerLeft: () => (
            //   <TouchableOpacity activeOpacity={0.5}>
            //     <AntDesign name="menu-fold" size={24} color="black" />
            //   </TouchableOpacity>
            // ),
            headerRight: () => (
              <TouchableOpacity 
              onPress={()=> ''}
              activeOpacity={0.5}>
                <Feather name="user" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        {/* your app is job aggregator takes job openings from other platforms and places it in an all in one platform*/}
        <Screen
          name="jobDetailScreen"
          component={JobDetailsScreen}
          options={{
            headerStyle: { backgroundColor: "white" },
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitle: 'Job Details',
            // headerLeft: () => (
            //   <TouchableOpacity activeOpacity={0.5}>
            //     <AntDesign name="arrowleft" size={24} color="black" />
            //   </TouchableOpacity>
            // ),

            // headerRight: () => (
            //   <TouchableOpacity 
            //   onPress={shareJobLink}
            //   activeOpacity={0.5}
            //   >
            //     <AntDesign name="sharealt" size={24} color="black" />
            //   </TouchableOpacity>
            // ),
          }}
        />
        <Screen 
        name="search"
        component={SearchScreen}
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Search results',
          headerRight: () => (
                <AntDesign name="sharealt" size={24} color="black" />
          )
        }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
