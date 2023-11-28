import { BiCommentDetail } from "react-icons/bi";
import Loading from "../../../Components/Loading";
import useSurvey from "../../../Hooks/useSurvey";
import { Link } from "react-router-dom";
import { MdReport } from "react-icons/md";
import { GrDislike } from "react-icons/gr";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import moment from "moment";
import Container from "../../../Components/Container";
import { useEffect } from "react";
import { useState } from "react";
import Heading from "../../../Components/Heading";

const RecentPublish = () => {
  const [recentSurveys, setRecentSurveys] = useState([]);
  const [surveys, surveyPending] = useSurvey();

  useEffect(() => {
    if (surveys.length > 0) {
      const filterSurvey = surveys.filter(
        (survey) => survey.status === "Approved"
      );

      const sortedSurveys = filterSurvey.sort((a, b) => b.date - a.date);
      const recentSurveys = sortedSurveys.slice(0, 6);

      setRecentSurveys(recentSurveys);
    }
  }, [surveys]);

  if (surveyPending) {
    return <Loading></Loading>;
  }

  return (
    <Container>
      <Heading
        mainHeading="Latest Surveys Section"
        subHeading="Stay updated with the latest surveys. Be the first to share your thoughts!"
      ></Heading>

      <div className=" grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {recentSurveys.map((survey) => (
          <div
            key={survey._id}
            className="max-w-md bg-white rounded-md shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="italic text-blue-500 mb-2">
                Category: {survey.category}
              </div>
              <div className="italic text-blue-500 mb-2">
                Publish: {moment(survey.date).format("MM-Do-YYYY, h:mm a")}
              </div>
              <div className="text-xl font-bold mb-2">{survey.title}</div>
              <p className="text-gray-700 mb-4">
                {survey.description.slice(0, 100)} ......
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-green-500 gap-2">
                    {survey.like ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                    <p>Vote: {survey.like}</p>
                  </div>
                  <div className="flex items-center text-blue-500 gap-2">
                    <GrDislike />
                    <p>Dislike: {survey.dislike}</p>
                  </div>

                  <div className="flex items-center text-blue-500 gap-2">
                    <MdReport />
                    <p>Report: {survey.report}</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/surveysDetails/${survey._id}`}
                className="btn btn-outline btn-sm mt-5 w-32"
              >
                Details <BiCommentDetail />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default RecentPublish;
