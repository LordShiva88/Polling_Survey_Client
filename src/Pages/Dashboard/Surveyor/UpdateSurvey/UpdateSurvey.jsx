import { useFieldArray, useForm } from "react-hook-form";
import PageBanner from "../../../../Components/PageBanner";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";
import useSurvey from "../../../../Hooks/useSurvey";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../Components/Loading";
import { signInAnonymously } from "firebase/auth";

const UpdateSurvey = () => {
  const [surveys, isPending, refetch] = useSurvey();
  const axios = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const filterSurvey = surveys.filter((survey) => survey._id === id);
  const survey = filterSurvey[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = async (data) => {
    const newSurvey = {
      title: data.title,
      description: data.description,
      category: data.category,
      options: data.options,
    };
    axios
      .put(`/api/v1/surveys/surveyor/${survey._id}`, newSurvey)
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          toast.success("Your Survey Changes Successful");
          reset();
          refetch();
          navigate("/dashboard/myPost");
        }
      })
      .catch((error) => console.error(error));
  };

  if (isPending) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <PageBanner></PageBanner>
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          Update Survey
        </h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Title:
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                defaultValue={survey.title}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Description:
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                defaultValue={survey.description}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Category:
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                defaultValue={survey.category}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Technology">Technology</option>
                {/* ... (other options) ... */}
                <option value="Cybersecurity">Cyber Security</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Options:
              </label>
              {fields.map((option, index) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 mb-4"
                >
                  <input
                    {...register(`options[${index}]`)}
                    className="p-2 flex-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <AiTwotoneDelete className="text-2xl" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({})}
                className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              >
                Add Option
              </button>
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded-md w-full hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
            >
              Create Survey
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSurvey;
