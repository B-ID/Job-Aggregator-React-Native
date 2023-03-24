import { useState, useEffect } from "react";
import axios from "axios";
import { Util } from "../util/Util";
import { JobData } from "../components/PopularJobCard";

const useFetch = (endpoint: string, query: {}) => {
  const [data, setData] = useState<JobData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": Util.API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);

    } catch (error: any) {
      setError(error.message);
      alert(error.message);
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setError(null)
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
