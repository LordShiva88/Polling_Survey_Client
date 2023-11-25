import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSurvey = () => {
  const axiosSecure = useAxiosSecure();
  const { data: surveys = [] } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/surveys`);
      return res.data;
    },
  });
  return surveys;
};

export default useSurvey;
