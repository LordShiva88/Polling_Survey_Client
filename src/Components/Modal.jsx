import { useState } from "react";
const Modal = ({ children, btnName }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div>
        {show && (
          <div
            className="flex items-center transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
            >
              <div className="relative py-8 px-8 md:px-16 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                <div className="w-full flex justify-center  mb-4">
                  {children}
                </div>
                <div className="flex justify-center mt-10">
                  <button
                    className="btn btn-outline"
                    onClick={() => setShow(!show)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="" id="button">
          <button
            className="btn btn-outline btn-sm"
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
