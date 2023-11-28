const Heading = ({ mainHeading, subHeading }) => {
  return (
    <div className="font-sans text-center py-10 md:py-20">
      <h1 className="font-bold text-2xl  text-gray-800">{mainHeading}</h1>
      <div className="h-1 w-24 bg-blue-500 my-2 mx-auto"></div>
      <h2 className="max-w-sm mx-auto text-gray-600">{subHeading}</h2>
    </div>
  );
};

export default Heading;
