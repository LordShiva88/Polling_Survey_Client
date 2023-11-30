import moment from "moment";
import Loading from "../../../../Components/Loading";
import useSurvey from "../../../../Hooks/useSurvey";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { GrDislike } from "react-icons/gr";
import { MdReport } from "react-icons/md";
import Heading from "../../../../Components/Heading";
import State from "./State";

const AdminDashboard = () => {
  const [surveys, isPending] = useSurvey();
  if (isPending) {
    return <Loading></Loading>;
  }

  const approvedSurveys = surveys.filter(
    (survey) => survey.status === "Approved"
  );
  return (
    <div>
      <Heading
        subHeading={"Here All Progress Of Your Website"}
        mainHeading={"Home"}
      ></Heading>
      <State></State>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          All Survey Requests
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {approvedSurveys.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    There are no survey requests added yet.
                  </td>
                </tr>
              )}
              {approvedSurveys.map((survey, index) => (
                <tr
                  key={survey._id}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="text-left px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <h2 className="font-bold text-blue-600">{survey.title}</h2>
                    <p className="text-sm text-gray-600">
                      User: {survey.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      Date: {moment(survey.date).format("MM-D-YY, h:mm a")}
                    </p>
                  </td>
                  <td className="space-x-2 ">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
