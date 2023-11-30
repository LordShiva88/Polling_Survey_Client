import { Link } from "react-router-dom";
import banner from "../assets/image/pagebanner.png";
const PageBanner = ({ title, subTitle, pageName }) => {
  return (
    <div
      className="hero relative bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="relative overflow-hidden group mt-20">
        <div className="relative md:p-12 lg:p-16 text-white container mx-auto transform transition-transform duration-300 ease-in-out group-hover:scale-105 p-5 text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-3">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-4">
           {subTitle}
          </p>
          <p className="text-lg md:text-xl mb-8"><Link className="hover:underline hover:text-[#eb347a]" to={'/'}>Home</Link> &gt;&gt; {pageName}</p>
          <button className="bg-[#eb347a] text-white py-2 px-6 rounded-lg hover:bg-[#ff66a1] transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-[#ff66a1]">
            Explore How it Works
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
