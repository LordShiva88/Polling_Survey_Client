import Loading from "../../../../Components/Loading";
import useSurvey from "../../../../Hooks/useSurvey";
import moment from "moment/moment";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllSurveyRequest = () => {
  const [surveys, isPending, refetch] = useSurvey();
  const [comment, setComment] = useState("");
  const axiosSecure = useAxiosSecure();
  if (isPending) {
    return <Loading></Loading>;
  }

  const pendingSurveys = surveys.filter(
    (survey) => survey.status === "pending"
  );

  const handleSurveyAction = (id, status) => {
    const updated = {
      comment: comment,
      status: status,
    };
    axiosSecure
      .put(`/api/v1/surveys/admin/${id}`, updated)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success(`Successfully ${status} this survey`);
          setComment(null);
          refetch();
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">All Survey Requests</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto ">
          {/* Table Head */}
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Actions</th>
              <th className="px-4 py-2">Comment</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {pendingSurveys.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  There are no survey requests added yet.
                </td>
              </tr>
            )}
            {pendingSurveys.map((survey, index) => (
              <tr
                key={survey._id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <h2 className="font-bold text-blue-500">
                    Title: {survey.title}
                  </h2>
                  <p className="text-sm text-gray-500">User: {survey.email}</p>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    {moment(survey.date).format("MM-D-YY, h:mm a")}
                  </p>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleSurveyAction(survey._id, "Approved")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Publish
                  </button>
                  <div className="dropdown">
                    <label tabIndex={0} className="m-1">
                      <span className="bg-blue-500 text-white px-4 py-2 rounded">
                        Reject
                      </span>
                    </label>
                    <div
                      tabIndex={0}
                      className="dropdown-content z-[1] p-2 shadow bg-base-100"
                    >
                      <div className="p-5">
                        <textarea
                          className="resize-none  p-4 border-2 border-blue-500 rounded focus:outline-none focus:ring focus:border-blue-300 placeholder-gray-500"
                          placeholder="Enter rejection reason..."
                          name="text"
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button
                          onClick={() =>
                            handleSurveyAction(survey._id, "Rejected")
                          }
                          className="btn btn-sm btn-outline"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">{survey.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSurveyRequest;
