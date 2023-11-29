import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUser = (roleFilter) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    refetch: userFetch,
    isPending: usersPending,
  } = useQuery({
    queryKey: ["users", roleFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/users?role=${roleFilter}`);
      return res.data;
    },
  });
  return [users, usersPending, userFetch];
};

export default useAllUser;
