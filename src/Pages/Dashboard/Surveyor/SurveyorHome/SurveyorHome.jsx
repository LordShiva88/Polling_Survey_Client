import { FaComments, FaEye, FaPlus } from "react-icons/fa6";

const SurveyorHome = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold mb-4">Surveyor Dashboard</h1>
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          <FaPlus className="mr-2" />
          Create/Update Survey
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          <FaComments className="mr-2" />
          View User Feedback
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <FaEye className="mr-2" />
          View Admin Feedback
        </button>
      </div>

      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Open Modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SurveyorHome;
