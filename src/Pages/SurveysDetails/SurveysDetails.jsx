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

const SurveysDetails = () => {
  const [liked, setLiked] = useState(true);
  const [dislike, setDislike] = useState(true);
  const [comment, setComment] = useState("");
  const axiosSecure = useAxiosSecure();
  const id = useParams();
  const [surveys, isPending, refetch] = useSurvey();
  const filterSurvey = surveys.filter((survey) => survey._id === id.id);
  const handleSubmit = (id) => {};
  const getSurvey = filterSurvey[0];
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

            <div className="flex mb-4 gap-10">
              <button
                type="button"
                className="text-green-500 hover:underline"
                title="Like"
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
                type="button"
                className="text-red-500 hover:underline"
                title="Dislike"
              >
                Report
              </button>
              <button
                type="button"
                className="text-yellow-500 hover:underline"
                title="Report"
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
            onClick={() => handleSubmit(getSurvey._id)}
          >
            Submit
          </button>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">
              Comments for this survey:
            </h3>
            <div className="space-y-4">
              {/* Comment 1 */}
              <div className="flex items-center space-x-4">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="User Avatar"
                />
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-gray-700">
                    Great experience! Very satisfied.
                  </p>
                </div>
              </div>
              {/* Add more comments as needed */}
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
