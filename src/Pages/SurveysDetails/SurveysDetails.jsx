import { useState } from "react";
import { FaRegHeart, FaHeart, FaChevronDown, FaCrown } from "react-icons/fa6";
import { GrDislike } from "react-icons/gr";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useSurvey from "../../Hooks/useSurvey";
import HelmetProvider from "../../Components/HelmetProvider";
import Container from "../../Components/Container";
import Loading from "../../Components/Loading";
import useRole from "../../Hooks/useRole";
import PageBanner from "../../Components/PageBanner";

const SurveysDetails = () => {
  const { userRole, userRolePending } = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [surveys, surveyPending, fetch] = useSurvey();
  const navigate = useNavigate();

  const getSurvey = surveys.find((survey) => survey._id === id);
  const {
    data: comments = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/surveys/comments`);
      return res.data;
    },
  });

  const filterComments = comments.filter(
    (comment) => comment.id === getSurvey?._id
  );
  const handleFeedback = () => {
    const data = {
      comment,
      status: "like",
      userImage: user?.photoURL,
      userName: user?.displayName,
      id: getSurvey?._id,
      date: Date.now(),
    };
    axiosSecure.post(`/api/v1/surveys/comments`, data).then((res) => {
      if (res.data.insertedId) {
        toast.success("Your Survey Changes Successful");
        refetch();
      }
    });
  };

  const handleVote = (status) => {
    if (!user) {
      return navigate("/login");
    }
    if (user?.email === getSurvey.email) {
      return;
    }
    const data = {
      status: status,
      participantEmail: user?.email,
    };
    axiosSecure.patch(`/api/v1/surveys/${getSurvey?._id}`, data).then((res) => {
      if (res.data.matchedCount > 0) {
        toast.success("Thank For Your vote");
        setLiked(true);
        fetch();
      }
    });
  };

  if (isPending && surveyPending && userRolePending) {
    return <Loading />;
  }

  const isProUser = userRole?.userRole === "Pro User";

  return (
    <div className="bg-gradient-to-b from-blue-500 via-blue-300 to-white text-white min-h-screen">
      <HelmetProvider helmetTitle={"SurveySift || Surveys Details"} />
      <PageBanner
        title="Dive Deeper into Insights"
        subTitle="Explore in-depth survey results and gain valuable insights into the collective opinions of our community."
        pageName="Survey Details"
      ></PageBanner>
      <Container>
        <div className="my-20 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-blue-600">
            {getSurvey?.title}
          </h2>
          <p className="mb-4 text-gray-800">Dear Participant,</p>
          <p className="mb-8 text-gray-700">{getSurvey?.description}</p>
          <form className="mb-6">
            {getSurvey?.options.map((option, index) => (
              <div key={index} className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  {index + 1}. {option}
                </label>
                <div className="relative mt-2">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-800 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    defaultValue=""
                  >
                    <option disabled value="" className="text-gray-500">
                      Select your satisfaction level
                    </option>
                    <option value="Very Satisfied">Very Satisfied</option>
                    <option value="Satisfied">Satisfied</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Dissatisfied">Dissatisfied</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <FaChevronDown />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Additional Comments:{" "}
                <span className="text-red-500">(Only Pro User)</span>
              </label>
              <textarea
                className="form-input mt-1 p-2 w-full border rounded-md bg-gray-100 text-gray-800"
                rows="3"
                placeholder="Enter your comments here"
                onChange={(e) => setComment(e.target.value)}
                disabled={!isProUser}
              ></textarea>
            </div>
          </form>
          <div className="">
            {isProUser ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 md:w-96 w-full"
                onClick={handleFeedback}
                disabled={!isProUser}
              >
                Submit
              </button>
            ) : (
              <NavLink
                to={"/checkout"}
                className="btn md:w-96 w-full flex items-center space-x-2 btn-outline btn-info"
              >
                <FaCrown />
                Get Pro Badge
              </NavLink>
            )}
          </div>
          <div className="flex mt-4 space-x-4">
            <button
              onClick={() => handleVote("like")}
              className="flex items-center text-green-500 hover:underline"
            >
              {liked ? (
                <FaHeart size={24} className="text-red-600" />
              ) : (
                <FaRegHeart size={24} />
              )}
              <span className="ml-2 text-xl">Like: {getSurvey?.like}</span>
            </button>
            <button
              onClick={() => handleVote("report")}
              className="text-red-500 hover:underline"
            >
              Report
            </button>
            <button
              onClick={() => handleVote("dislike")}
              className="flex items-center text-yellow-500 hover:underline"
            >
              <GrDislike size={24} />
              <span className="ml-2 text-xl">
                Dislike: {getSurvey?.dislike}
              </span>
            </button>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Comments for this survey:
            </h3>
            <div className="space-y-4">
              {filterComments.map((comment) => (
                <div key={comment._id} className="flex items-center space-x-4">
                  {comment.user_image ? (
                    <div className="ml-5 avatar">
                      <div className="rounded-full ring ring-primary ring-offset-blue-100  w-10 h-10">
                        <img src={comment.user_image} />
                      </div>
                    </div>
                  ) : (
                    <img
                      src="https://i.ibb.co/DMJ8ZRc/user.png"
                      alt="Default Avatar"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-700">
                      {comment.user_name}
                    </p>
                    <p className="text-gray-800">{comment.userFeedBack}</p>
                    <p className="text-gray-600">
                      {moment(comment.date).format("MMM Do YY")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-gray-800">
            Thank you for taking the time to complete our survey!
          </p>
        </div>
      </Container>
    </div>
  );
};

export default SurveysDetails;
