import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import React, { useLayoutEffect } from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import {
  JobAbout,
  Company,
  JobFooter,
  JobTabs,
  Specifics,
} from "../components";
import { useCallback, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useRoute } from "@react-navigation/native";
import {AntDesign} from '@expo/vector-icons'

type Props = NativeStackScreenProps<RootStackParamList, "jobDetailScreen">;

const tabs = ["About", "Qualifications", "Responsibilities"];

async function shareJobLink(jobLink: string) {
  try {
    const result = await Share.share({
      message: jobLink,
    })

  } catch (error: any) {
    Alert.alert(error.message)

  }

}

export default function JobDetailsScreen({
  navigation,
  route: { params },
}: Props) {
  const [refreshing, setrefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const { item } = params;
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: item.job_id,
  });

  useLayoutEffect(() => {
   navigation.setOptions({
    headerRight: () => (
  <TouchableOpacity 
  onPress={() => shareJobLink(item.job_google_link)}
  activeOpacity={0.5}
  >
    <AntDesign name="sharealt" size={24} color="black" />
  </TouchableOpacity>

    )
   }) 
  
  }, [navigation])




  function onRefresh() {
    return useCallback(() => {
      setrefreshing(true)
      refetch()
      setrefreshing(false)
    }, [])
  }

  function displayTabContent() {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={item.job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "About":
        return <JobAbout info={item.job_description ?? "No data provided"} />;

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={item.job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        break;
    }
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="flex-1 px-4 bg-white"
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="gray" />
        ) : // remove the bang operator when you want to start fetching data again
        error ? (
          <Text className="text-red-400 animate pulse">
            Something went wrong!!
          </Text>
        ) : data.length === 0 ? (
          <Text>No data</Text>
          ) : (
            <View className="">
            <Company
              companyLogo={item.employer_logo}
              jobTitle={item.job_title}
              companyName={item.employer_name}
              location={item.job_country}
              />

            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              />

            <View>
              {displayTabContent()}
              <Text>
                {/* {JSON.stringify(job.job_highlights.Qualifications, null, 2)} */}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <JobFooter 
      url={item.job_google_link ?? 'https://careers/google.com/jobs/results'}
      isLoading={isLoading}
      />
      </>
  );
}
