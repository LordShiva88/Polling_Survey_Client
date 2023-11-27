import moment from "moment";
import Loading from "../../../../Components/Loading";
import useSurvey from "../../../../Hooks/useSurvey";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { GrDislike } from "react-icons/gr";
import { MdReport } from "react-icons/md";
import { FaDollarSign, FaShoppingCart, FaUsers } from "react-icons/fa";

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
      <div className="flex-1 bg-white rounded-lg mt-4 p-8">
        <h4 className="text-xl font-bold">Statistics</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-indigo-600">
                Total Revenue
              </span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600">
                <FaDollarSign className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-end">
                  <span className="text-2xl 2xl:text-3xl font-bold">
                    $8,141
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-green-600">
                Total Survey
              </span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600">
                <FaShoppingCart className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-end">
                  <span className="text-2xl 2xl:text-3xl font-bold">217</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-blue-600">
                Total Users
              </span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600">
                <FaUsers className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-end">
                  <p className="mr-2">Surveyor:</p>
                  <span className="text-2xl 2xl:text-3xl font-bold">54</span>
                </div>
                <div className="flex items-end">
                  <p className="mr-2">Pro User:</p>
                  <span className="text-2xl 2xl:text-3xl font-bold">54</span>
                </div>
                <div className="flex items-end">
                  <p className="mr-2">User:</p>
                  <span className="text-2xl 2xl:text-3xl font-bold">54</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <h2 className="font-bold text-blue-600">{survey.title}</h2>
                    <p className="text-sm text-gray-600">
                      User: {survey.email}
                    </p>
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
