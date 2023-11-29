import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { GrDislike } from "react-icons/gr";
import { MdReport } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import HelmetProvider from "../../Components/HelmetProvider";
import Container from "../../Components/Container";
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
        {/* Search and filter options section */}
        <div className="flex justify-between gap-5 md:flex-row flex-col items-center">
          <div className="flex-1">
            <Heading
              mainHeading="How SurveySift Works"
              subHeading="Explore the simplicity and effectiveness of SurveySift. Your feedback, your way."
            />
          </div>
          <div className="flex gap-5 mb-10 lg:mb-0">
            <div className="relative px-6 py-2.5 w-full border border-black rounded-md">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="outline-none "
                placeholder="Search By Title ...."
              />
            </div>
            <select
              onChange={(e) => setCategory(e.target.value)}
              defaultValue=""
              className="px-6 py-2.5 w-full border rounded-md border-black "
            >
              <option value="" disabled>
                Select Category
              </option>
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
            <select
              onChange={(e) => setOrder(e.target.value)}
              className="px-6 py-2.5 w-full border rounded-md border-black "
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Descending">Descending</option>
              <option value="Ascending">Ascending</option>
            </select>
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

                  {/* Link to survey details page */}
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
