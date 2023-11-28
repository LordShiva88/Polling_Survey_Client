import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import HelmetProvider from "../../Components/HelmetProvider";
import { GrDislike } from "react-icons/gr";
import { MdReport } from "react-icons/md";
import Container from "../../Components/Container";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import Nodata from "../../Components/Nodata";
import Loading from "../../Components/Loading";
import Heading from "../../Components/Heading";
import PageBanner from "../../Components/PageBanner";

const Surveys = () => {
  const axios = useAxios();

  // State variables for search and filter options
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [category, setCategory] = useState("");
  const [surveys, setSurvey] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch survey data based on filter options
  useEffect(() => {
    axios
      .get(`/api/v1/surveys?category=${category}&vote=${order}&title=${title}`)
      .then((res) => {
        setSurvey(res.data);
        setLoading(false);
      });
  }, [category, order, title, axios]);

  // Filter surveys with "Approved" status
  const filterSurvey = surveys.filter((survey) => survey.status === "Approved");

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="">
      <HelmetProvider helmetTitle={"SurveySift || Surveys"} />
      <PageBanner></PageBanner>
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <Heading
              mainHeading="How SurveySift Works"
              subHeading="Explore the simplicity and effectiveness of SurveySift. Your feedback, your way."
            />
          </div>
          <div className="lg:flex justify-end gap-10 items-center space-y-5">
            {/* Search bar */}
            <div className="relative flex">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="search"
                className="relative rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary w-full"
                placeholder="Search by title"
              />
              <button
                className="relative z-[2] rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white transition duration-150 hover:bg-primary-700 hover:shadow-lg"
                type="button"
                id="button-addon1"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <BsSearch className="h-5 w-5" />
              </button>
            </div>

            {/* Category dropdown */}
            <select
              onChange={(e) => setCategory(e.target.value)}
              defaultValue=""
              className="px-6 py-2.5 w-full lg:w-1/4 border rounded-md"
            >
              <option value="">All</option>
              <option value="Technology">Technology</option>
              <option value="Science">Science</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Environment">Environment</option>
              <option value="Programming">Programming</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Cybersecurity">Cyber Security</option>
            </select>

            {/* Order by dropdown */}
            <div className="flex items-center">
              <label htmlFor="roleFilter" className="mr-2">
                Filter Vote
              </label>
              <select
                onChange={(e) => setOrder(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All</option>
                <option value="Descending">Descending</option>
                <option value="Ascending">Ascending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Survey cards section */}
        {surveys.length === 0 ? (
          <Nodata
            emptyMessage={`Sorry, there are no surveys available for the category "${category}" at the moment.`}
            path={"/"}
          />
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mb-20">
            {filterSurvey.map((survey) => (
              <div
                key={survey._id}
                className="max-w-md bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
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
                    className="btn btn-outline btn-sm mt-5 w-32 hover:bg-primary-700 hover:text-white transition duration-300 ease-in-out"
                  >
                    Details <BiCommentDetail />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Surveys;
