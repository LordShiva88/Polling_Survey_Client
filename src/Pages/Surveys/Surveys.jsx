import HelmetProvider from "../../Components/HelmetProvider";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { GrDislike } from "react-icons/gr";

const Surveys = () => {
  return (
    <div className="bg-gray-200 p-8">
      <HelmetProvider helmetTitle={"SurveySift || Surveys"}></HelmetProvider>
      <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <div className="p-6">
          <div className="text-xl font-bold mb-2">Awesome Survey Title</div>
          <p className="text-gray-700 mb-4">
            This is a brief description of the survey.
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="italic text-blue-500">Category: Technology</div>
            <div className="flex items-center">
              <span className="mr-1">👍</span>
              <span>Total Votes: 100</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>My Posted Survey</h1>
        <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Customer Satisfaction Survey
          </h2>
          <p className="mb-4">Dear [Recipient],</p>
          <p className="mb-8">
            We value your opinion and would appreciate it if you could take a
            few moments to complete our Customer Satisfaction Survey. Your
            feedback is crucial in helping us improve our services.
          </p>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                1. How satisfied are you with the overall experience?
              </label>
              <div className="mt-1">
                <select className="form-select">
                  <option>Very Satisfied</option>
                  <option>Satisfied</option>
                  <option>Neutral</option>
                  <option>Dissatisfied</option>
                  <option>Very Dissatisfied</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Additional Comments:
              </label>
              <textarea
                className="form-input mt-1"
                rows="3"
                placeholder="Enter your comments here"
              ></textarea>
            </div>

            <div className="flex space-x-4">
              <button type="button" className="text-green-500" title="Like">
                <FaRegHeart size={24} />
              </button>
              <button type="button" className="text-red-500" title="Dislike">
                Report
              </button>
              <button type="button" className="text-yellow-500" title="Report">
                <GrDislike size={24} />
              </button>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Submit
            </button>
          </form>

          <p className="mt-8">
            Thank you for taking the time to complete our survey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Surveys;
