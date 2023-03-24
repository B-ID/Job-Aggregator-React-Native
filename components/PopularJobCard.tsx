import { View, Text, TouchableOpacity, Image } from "react-native";
import { checkImageUrl } from "../util/checkImageUrl";

export type JobData = {
  employer_name: string;
  employer_logo: string;
  employer_website: string;
  employer_company_type: string;
  job_publisher: string;
  job_id: string;
  job_employment_type: string;
  job_title: string;
  job_apply_link: string;
  job_country: string
  job_highlights: {
    Qualifications: string[]
    Responsibilities: string[]
  }
  job_description: string
  job_google_link: string
};

type Props = {
  item: JobData;
  selectedJob: () => void
  handleCardPress: (item: JobData) => void;
};


const PopularJobCard = ({ item, selectedJob, handleCardPress }: Props) => {
  
  

  return (
    <TouchableOpacity className=" shadow-md bg-white p-4 w-48 border rounded-lg border-gray-100" onPress={() => handleCardPress(item)}>
      <TouchableOpacity className="">
        <Image
          className="h-20 aspect-square object-cover"
          source={{
            uri: checkImageUrl(item.employer_logo) ? item.employer_logo : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'
          }}
          resizeMode="contain"
          alt="job-logo"
        />
      </TouchableOpacity>
      <Text className="text-gray-500 mb-2 " numberOfLines={1}>{item.employer_name}</Text>
      {/* job info */}
      <View className="w-full bg-gray-50 p-1 rounded">
        <Text className="text-md mb-1 font-medium  ">{item.job_title}</Text>
        <Text className="text-gray-500">{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
