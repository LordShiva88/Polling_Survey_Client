import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Loading from "../../../Components/Loading";
import useSurvey from "../../../Hooks/useSurvey";
import { GrDislike } from "react-icons/gr";
import { MdReport } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiCommentDetail } from "react-icons/bi";
import Container from "../../../Components/Container";
import Heading from "../../../Components/Heading";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const FeaturedSurveys = () => {
  const [surveys, surveyPending] = useSurvey();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  if (surveyPending) {
    return <Loading />;
  }

  const approvedSurveys = surveys.filter(
    (survey) => survey.status === "Approved"
  );

  const featuredSurveys = approvedSurveys
    .slice(0, 6)
    .sort((a, b) => b.like - a.like);

  return (
    <Container>
      <Heading
        mainHeading="Explore Trending Surveys"
        subHeading="Discover and participate in the most voted surveys. Your opinion matters!"
      />
      <div
        data-aos="zoom-in"
        className="grid lg:grid-cols-3 md:grid-cols-2 gap-4"
      >
        {featuredSurveys.map((survey) => (
          <div
            key={survey._id}
            className="max-w-md bg-white rounded-md shadow-md overflow-hidden"
            data-aos="zoom-in"
          >
            <div className="p-6">
              <div className="italic text-blue-500 mb-2">
                Category: {survey.category}
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

export default FeaturedSurveys;
