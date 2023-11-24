import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare, FaGithub } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <div className="flex justify-evenly">
      <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md p-2 hover:bg-gray-100 transition duration-300">
        <FcGoogle className="h-6 w-6" />
      </button>
      <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md p-2 hover:bg-gray-100 transition duration-300">
        <FaGithub className="h-6 w-6" />
      </button>
      <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md p-2 hover:bg-gray-100 transition duration-300">
        <FaFacebookSquare className="h-6 w-6 text-blue-500" />
      </button>
    </div>
  );
};

export default SocialLogin;
