import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Loading from "../../../../Components/Loading";
import useSurvey from "../../../../Hooks/useSurvey";
import useAuth from "../../../../Hooks/useAuth";
import { MdReport } from "react-icons/md";
import { GrDislike } from "react-icons/gr";
import moment from "moment";
import Nodata from "../../../../Components/Nodata";
import Modal from "../../../../Components/Modal";
import useComments from "../../../../Hooks/useComments";
import { useState } from "react";
const SurveyorHome = () => {
  const { user } = useAuth();
  const [allComments, setAllComments] = useState([]);
  const [surveys, isPending] = useSurvey();
  const [comments] = useComments();

  if (isPending) {
    return <Loading></Loading>;
  }

  const approvedSurveys = surveys.filter(
    (survey) => survey.email === user?.email
  );

  const handleFindComment = (id) => {
    console.log(id);
    const findComment = comments.filter((comment) => comment.id === id);
    setAllComments(findComment);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        All Survey Requests
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Progress</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {approvedSurveys.length === 0 && <Nodata></Nodata>}
            {approvedSurveys.map((survey, index) => (
              <tr
                key={survey._id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <h2 className="font-bold text-blue-600">{survey.title}</h2>
                  <p className="text-sm text-gray-600">User: {survey.email}</p>
                  <p className="text-sm text-gray-600">
                    Date: {moment(survey.date).format("MM-D-YY, h:mm a")}
                  </p>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <div className="flex justify-evenly  items-center text-green-500">
                    {survey.like ? <FaHeart /> : <FaRegHeart />}
                    <p>Vote: {survey.like}</p>
                  </div>
                  <div className="flex justify-evenly items-center text-blue-500">
                    <GrDislike />
                    <p>Dislike: {survey.dislike}</p>
                  </div>
                  <div className="flex justify-evenly  items-center text-blue-500">
                    <MdReport />
                    <p>Report: {survey.report}</p>
                  </div>
                </td>
                <td className="px-4 py-2">
                  {survey.status === "Approved" ? (
                    <div className="space-y-2">
                      <p className="text-green-500 font-bold">
                        {survey.status}
                      </p>

                      <div onClick={() => handleFindComment(survey._id)}>
                        <Modal btnName={"All Comments"}>
                          {allComments.map((comment) => (
                            <div
                              key={comment._id}
                              className="flex items-center space-x-4"
                            >
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
                                <p className="text-gray-800">
                                  {comment.userFeedBack}
                                </p>
                                <p className="text-gray-600">
                                  {moment(comment.date).format("MMM Do YY")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </Modal>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-red-500 font-bold">{survey.status}</p>
                      <Modal btnName={"Details"}>
                        <div>Admin: {survey.adminFeedback}</div>
                      </Modal>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyorHome;
