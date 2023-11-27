import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axios = useAxiosSecure();
  const { data: userRole, isPending } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`/users/role/${user.email}`);
      return res.data;
    },
  });
  return { userRole, isPending };
};

export default useRole;
