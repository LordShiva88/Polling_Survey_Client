const Heading = ({ mainHeading, subHeading }) => {
  return (
    <div className="px-4 mx-auto max-w-7xl md:py-16 py-10">
      <div className="max-w-xl mx-auto">
        <div className="text-center ">
          <div className="relative flex flex-col items-center">
            <div className="absolute lg:-top-14 lg:-left-0 md:-left-100  lg:text-[120px] text-[60px] text-gray-400 font-bold opacity-10">
              SurveySift
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold dark:text-white">
              <span className="text-blue-500"> {mainHeading}</span>{" "}
            </h1>
            <div className="flex w-24 mt-3 mb-4 overflow-hidden rounded">
              <div className="flex-1 h-2 bg-blue-200"></div>
              <div className="flex-1 h-2 bg-blue-400"></div>
              <div className="flex-1 h-2 bg-blue-600"></div>
            </div>
          </div>
          <p className="text-base text-center max-w-lg text-gray-500">
            {subHeading}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Heading;
