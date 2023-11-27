import { FaHeart, FaRegHeart } from "react-icons/fa6";
import HelmetProvider from "../../Components/HelmetProvider";
import useSurvey from "../../Hooks/useSurvey";
import { GrDislike } from "react-icons/gr";
import { MdReport } from "react-icons/md";
import Container from "../../Components/Container";
import { Link } from "react-router-dom";
const Surveys = () => {
  const [surveys] = useSurvey();
  const filterSurvey = surveys.filter((survey) => survey.status === "Approved");
  return (
    <div className="p-8">
      <HelmetProvider helmetTitle={"SurveySift || Surveys"}></HelmetProvider>
      <Container>
        <div className="mt-20 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {filterSurvey.map((survey) => (
            <div
              key={survey._id}
              className="max-w-md bg-white rounded-md shadow-md"
            >
              <div className="p-6">
                <div className="italic text-blue-500">
                  Category: {survey.category}
                </div>
                <div className="text-xl font-bold mb-2">{survey.title}</div>
                <p className="text-gray-700 mb-4">{survey.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex justify-evenly  items-center text-green-500 gap-2">
                      {survey.like ? <FaHeart /> : <FaRegHeart />}
                      <p>Vote: {survey.like}</p>
                    </div>
                    <div className="flex justify-evenly items-center text-blue-500 gap-2">
                      <GrDislike />
                      <p>Dislike: {survey.dislike}</p>
                    </div>
                    <div className="flex justify-evenly  items-center text-blue-500 gap-2">
                      <MdReport />
                      <p>Report: {survey.report}</p>
                    </div>
                  </div>
                </div>
                <Link to={`/surveysDetails/${survey._id}`} className="btn">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Surveys;
