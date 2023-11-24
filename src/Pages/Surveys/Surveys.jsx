const Surveys = () => {
  return (
    <div className="bg-gray-200 p-8">
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
    </div>
  );
};

export default Surveys;
