import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useComments = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: comments = [],
    isPending,
    refetch: rerender,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/surveys/comments`);
      return res.data;
    },
  });

  return [comments, isPending, rerender];
};

export default useComments;
