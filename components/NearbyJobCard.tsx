import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { checkImageUrl } from "../util/checkImageUrl";
import { JobData } from "./PopularJobCard";

type Props = {
  job: JobData;
  handleNavigate: () => void;
};

const NearbyJobCard = ({ job, handleNavigate }: Props) => {
  return (
    <TouchableOpacity
      className=" shadow-md bg-white p-4 mb-2 border rounded-lg border-gray-100"
      onPress={handleNavigate}
    >
      <View className="justify-center ">
        {/* logo container */}
        <TouchableOpacity className="h-12 aspect-square mr-2">
          <Image
            className="w-full h-full object-contain"
            source={{
              uri: checkImageUrl(job.employer_logo)
                ? job.employer_logo
                : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
            }}
            resizeMode="contain"
            alt="job-logo"
          />
        </TouchableOpacity>

        {/* job info */}
        <View className="w-full bg-gray-50 p-1 rounded">
          <Text className="text-md mb-1 font-medium  ">{job.job_title}</Text>
          <Text className="text-gray-500 capitalize">{job.job_employment_type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
