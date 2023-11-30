import { useForm, useFieldArray } from "react-hook-form";
import { AiTwotoneDelete } from "react-icons/ai";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Heading from "../../../../Components/Heading";

const PostSurvey = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const navigate = useNavigate();
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
      like: 0,
      dislike: 0,
      report: 0,
      date: Date.now(),
      email: user?.email,
      status: "pending",
    };
    axios
      .post("/api/v1/surveys", newSurvey)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success(
            "Your Survey Request Successful Waiting for admin confirm"
          );
          reset();
          navigate("/dashboard/myPost");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="max-w-xl mx-auto">
      <Heading
        mainHeading={"Post a Survey"}
        subHeading={"Share your thoughts and gather feedback"}
      ></Heading>
      <div className="bg-white p-6 rounded-md shadow-md">
        <div>
          <h2 className="text-xl font-bold mb-2">Create Survey</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Title:
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
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
                className="mt-1 p-2 w-full border rounded-md"
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
                {...register("category", {
                  required: "Category is required",
                })}
                defaultValue=""
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Technology">Technology</option>
                <option value="Science">Science</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="Environment">Environment</option>
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Data Science">Data Science</option>
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
              className="py-2 px-4 bg-green-500 text-white rounded-md w-full"
            >
              Create Survey
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostSurvey;
