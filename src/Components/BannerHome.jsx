import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

const BannerHome = ({mainHeading, subHeading, description}) => {
  return (
    <div
      className="hero relative"
      style={{ backgroundImage: `url(https://i.ibb.co/VxnnGN5/download.jpg)` }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="flex flex-col md:flex-row container mx-auto items-center pt-20">
        <div className="w-full md:w-1/2 text-center md:text-left md:pr-8 mb-4 md:mb-0">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold  text-white">
            {mainHeading}:
            <span className="text-green-500">
              <Typewriter
                options={{
                  strings: [`${subHeading}`],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h1>
          <p className="font-medium my-4 text-white">{description}</p>
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-full btn"
          >
            Explore More
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <img src={"https://i.ibb.co/pzvgTNx/man3.png"} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BannerHome;
