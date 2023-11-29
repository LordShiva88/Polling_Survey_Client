import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading";
import { Link } from "react-router-dom";
import PostSurvey from "../PostSurvey/PostSurvey";
import Heading from "../../../../Components/Heading";

const MyPost = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // useEffect(() => {
  //   axiosSecure
  //     .get(`/api/v1/surveys/${user?.email}`)
  //     .then((res) => setData(res.data))
  //     .catch((error) => console.error(error));
  // }, [axiosSecure, user]);

  const {
    data: surveys = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/surveys/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/api/v1/surveys/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  if (isPending) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="max-w-xl mx-auto">
        <PostSurvey></PostSurvey>
      </div>
      <Heading
        mainHeading={"All Survey"}
        subHeading={"Here is your all survey you can edit and delete!!"}
      ></Heading>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {surveys.map((survey) => (
          <div
            key={survey._id}
            className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border gap-4"
          >
            <div className="p-6">
              <div className="italic text-blue-500 mb-2">
                Category: {survey.category}
              </div>
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {survey.title}
              </h5>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {survey.description}
              </p>
              {survey.options.map((option, id) => (
                <li key={id} className="">
                  {option}
                </li>
              ))}
            </div>
            <div className="p-6 pt-0 flex justify-between">
              <div className="flex items-center gap-2">
                <Link
                  to={`/dashboard/updateSurvey/${survey._id}`}
                  className="text-gray-500 focus:outline-none flex items-center"
                >
                  Edit <FaEdit className="ml-1" />
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(survey._id)}
                  type="button"
                  className="text-gray-500 focus:outline-none flex items-center"
                >
                  Delete <FaTrashAlt className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPost;
