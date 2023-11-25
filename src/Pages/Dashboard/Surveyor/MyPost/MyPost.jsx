import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const MyPost = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure
      .get(`/api/v1/surveys/${user?.email}`)
      .then((res) => setData(res.data))
      .catch((error) => console.error(error));
  }, [axiosSecure, user]);

  return (
    <div>
      <h1>My Posted Survey</h1>
    </div>
  );
};

export default MyPost;
