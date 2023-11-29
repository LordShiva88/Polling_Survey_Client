import { useState } from "react";
const Modal = ({ children,btnName}) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div>
        {show && (
          <div
            className="py-12 bg-gray-700 dark:bg-gray-900 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
            >
              <div className="relative py-8 px-8 md:px-16 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                <div className="w-full flex justify-center text-green-400 mb-4">
                  {children}
                </div>

                <div
                  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-500 transition duration-150 ease-in-out"
                  onClick={() => setShow(!show)}
                >
                  X
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex justify-center py-12" id="button">
          <button
            className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
            onClick={() => setShow(!show)}
          >
           {btnName}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
