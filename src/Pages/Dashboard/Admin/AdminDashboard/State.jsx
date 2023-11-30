import { FaDollarSign, FaShoppingCart, FaUsers } from "react-icons/fa";


const State = () => {

  

  return (
    <div className="flex-1 bg-white rounded-lg">
        <h4 className="text-xl font-bold">Statistics</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-indigo-600">
                Total Revenue
              </span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600">
                <FaDollarSign className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-end">
                  <span className="text-2xl 2xl:text-3xl font-bold">
                    $8,141
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-green-600">
                Total Survey
              </span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600">
                <FaShoppingCart className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-end">
                  <span className="text-2xl 2xl:text-3xl font-bold">217</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-blue-600">
                Total Users
              </span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600">
                <FaUsers className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-end">
                  <p className="mr-2">Surveyor:</p>
                  <span className="text-2xl 2xl:text-3xl font-bold">54</span>
                </div>
                <div className="flex items-end">
                  <p className="mr-2">Pro User:</p>
                  <span className="text-2xl 2xl:text-3xl font-bold">54</span>
                </div>
                <div className="flex items-end">
                  <p className="mr-2">User:</p>
                  <span className="text-2xl 2xl:text-3xl font-bold">54</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default State;