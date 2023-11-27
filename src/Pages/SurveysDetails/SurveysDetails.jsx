import { GrDislike, GrLike } from "react-icons/gr";
import HelmetProvider from "../../Components/HelmetProvider";
import { AiFillDislike } from "react-icons/ai";
import Container from "../../Components/Container";
import { useParams } from "react-router-dom";
import useSurvey from "../../Hooks/useSurvey";
import Loading from "../../Components/Loading";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useComments from "../../Hooks/useComments";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import moment, { months } from "moment/moment";

const SurveysDetails = () => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(true);
  const [dislike, setDislike] = useState(true);
  const [comment, setComment] = useState("");
  const axiosSecure = useAxiosSecure();
  const id = useParams();
  const [surveys, surveyPending, fetch] = useSurvey();

  const filterSurvey = surveys.filter((survey) => survey._id === id.id);
  const getSurvey = filterSurvey[0];

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
    (comment) => comment.id === getSurvey._id
  );

  if ((isPending, surveyPending)) {
    return <Loading></Loading>;
  }

  const handleFeedback = (id, status) => {
    const data = {
      comment,
      status,
      userImage: user?.photoURL,
      userName: user?.displayName,
      id: id,
      date: Date.now(),
    };
    axiosSecure.post(`/api/v1/surveys/comments`, data).then((res) => {
      if (res.data.insertedId) {
        toast.success("Your Survey Changes Successful");
        fetch();
      }
    });
  };

  const handleVote = (id, status) => {
    axiosSecure.patch(`/api/v1/surveys/${id}`, { status }).then((res) => {
      if (res.data.matchedCount > 0) {
        toast.success("Thank For Your vote");
        fetch();
      }
    });
  };

  if (isPending) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-8 bg-gray-100">
      <HelmetProvider
        helmetTitle={"SurveySift || Surveys Details"}
      ></HelmetProvider>
      <Container>
        <div className="mt-20 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">{getSurvey.title}</h2>
          <p className="mb-4">Dear Participant,</p>
          <p className="mb-8">{getSurvey.description}</p>
          <form className="mb-6">
            {getSurvey.options.map((option, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  {index + 1}. {option}
                </label>
                <div className="mt-1">
                  <select className="form-select">
                    <option value={"Very Satisfied"}>Very Satisfied</option>
                    <option value={"Satisfied"}>Satisfied</option>
                    <option value={"Neutral"}>Neutral</option>
                    <option value={"Dissatisfied"}>Dissatisfied</option>
                  </select>
                </div>
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Additional Comments: {"(Only Pro User)"}
              </label>
              <textarea
                className="form-input mt-1 p-2 w-full border rounded-md"
                rows="3"
                placeholder="Enter your comments here"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
          </form>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            onClick={() => handleFeedback(getSurvey._id)}
          >
            Submit
          </button>
          <div className="flex mb-4 gap-10 mt-5">
            <button
              onClick={() => handleVote(getSurvey._id, "like")}
              className="text-green-500 hover:underline"
            >
              <span className="flex items-center">
                {liked ? (
                  <FaHeart size={24} className="mr-2 text-red-600" />
                ) : (
                  <FaRegHeart size={24} className="mr-2" />
                )}

                <p className="text-xl">Like: {getSurvey.like}</p>
              </span>
            </button>
            <button
              onClick={() => handleVote(getSurvey._id, "report")}
              className="text-red-500 hover:underline"
            >
              Report
            </button>
            <button
              onClick={() => handleVote(getSurvey._id, "dislike")}
              className="text-yellow-500 hover:underline"
            >
              <span className="flex items-center">
                {dislike ? (
                  <AiFillDislike size={24} className="mr-2" />
                ) : (
                  <GrDislike size={24} className="mr-2" />
                )}
                <p className="text-xl">Dislike: {getSurvey.dislike}</p>
              </span>
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">
              Comments for this survey:
            </h3>
            <div className="space-y-4">
              {filterComments.map((comment) => (
                <div key={comment._id} className="flex items-center space-x-4">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={comment.user_image}
                    alt="User Avatar"
                  />
                  <div>
                    <p className="font-semibold">{comment.user_name}</p>
                    <p className="text-gray-700">{comment.userFeedBack}</p>
                    <p>{moment(comment.date).startOf("min").fromNow()} </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-gray-700">
            Thank you for taking the time to complete our survey!
          </p>
        </div>
      </Container>
    </div>
  );
};

export default SurveysDetails;
