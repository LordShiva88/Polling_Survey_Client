import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GrDislike } from "react-icons/gr";
import { MdReport } from "react-icons/md";

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
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {data.map((survey) => (
        <div
          key={survey._id}
          className="mx-auto bg-white rounded-md overflow-hidden shadow-md"
        >
          <div className="p-6">
            <div className="italic text-blue-500 mb-2">
              Category: {survey.category}
            </div>
            <div className="text-2xl font-bold mb-2">{survey.title}</div>
            <p className="text-gray-700 mb-4">{survey.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="mr-1">
                  {survey.like ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </span>
                <p>Total Vote: {survey.like}</p>
              </div>
              <div className="flex items-center gap-2">
                <GrDislike className="text-blue-500 mr-1" />
                <p>Total Dislike: {survey.dislike}</p>
              </div>
              <div className="flex items-center gap-2">
                <MdReport className="text-blue-500 mr-1" />{" "}
                <p>Total Report: {survey.report}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="text-gray-500 focus:outline-none flex items-center"
                >
                  Edit <FaEdit className="ml-1" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="text-gray-500 focus:outline-none flex items-center"
                >
                  Delete <FaTrashAlt className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPost;
