import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import logo from '../../../assets/image/logo.png';

const Footer = () => {
  return (
    <footer className="text-white bg-gray-900">
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 justify-around py-20">
        <div className="">
          <img src={logo}alt="Your Logo" className="w-20 mb-4" />
          <p className="text-gray-400">
            Survey Sift Limited. <br />
            Gathering insights, shaping opinions since 2000
          </p>
        </div>

        <div className="">
          <h2 className="text-lg font-semibold mb-2 text-gray-400">
            Contact Us
          </h2>
          <p>1234 Elm Street, Springfield, IL 62701, USA</p>
          <p>Email: example@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        <div className="">
          <h2 className="text-lg font-semibold mb-2 text-gray-400">
            Quick Links
          </h2>
          <ul className="list-disc list-inside">
            <li className="text-white hover:text-blue-500 transition duration-300 mb-2">
              <a href="#about">About Us</a>
            </li>
            <li className="text-white hover:text-blue-500 transition duration-300 mb-2">
              <a href="#contact">Contact</a>
            </li>
            <li className="text-white hover:text-blue-500 transition duration-300 mb-2">
              <a href="#jobs">Jobs</a>
            </li>
            <li className="text-white hover:text-blue-500 transition duration-300">
              <a href="#press-kit">Press Kit</a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold mb-2 text-gray-400">
            Follow Us
          </h2>
          <p>Connect with us on social media</p>
          <nav>
            <div className="flex gap-5 text-3xl">
              {" "}
              {/* Adjust font size here */}
              <a
                href="#linkedin"
                className="hover:text-blue-500 transition duration-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="#facebook"
                className="hover:text-blue-500 transition duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="#github"
                className="hover:text-blue-500 transition duration-300"
              >
                <FaGithub />
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div className="bg-gray-700 text-gray-300 ">
        <div className="flex items-center justify-center gap-5 p-4 container mx-auto">
          <img src={logo} alt="Your Logo" className="w-10" />
          <p>
            Copyright © {new Date().getFullYear()}  SurveySift Company. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
