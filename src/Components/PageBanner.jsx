import banner from "../assets/image/pagebanner.png";
const PageBanner = () => {
  return (
    <div
      className="hero relative"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="relative mb-8 overflow-hidden group">
        <div className="relative md:p-12 lg:p-16 text-white container mx-auto transform transition-transform duration-300 ease-in-out group-hover:scale-105 p-5">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-sdaemibold mb-2">
            Post An Survey
          </h1>
          <p className="text-lg md:text-xl mb-4">
            Post your job now, Top freelancer waiting for give you!!
          </p>
          <p className="text-lg md:text-xl mb-8">Home &gt;&gt; Add Job</p>
          <button className="bg-[#eb347a] text-white py-2 px-6 rounded-lg hover:bg-[#ff66a1] transition duration-300 ease-in-out">
            Explore How it&#39;s work
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
