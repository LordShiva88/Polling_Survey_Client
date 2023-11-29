import { useState } from "react";
import { useForm } from "react-hook-form";
import HelmetProvider from "../../Components/HelmetProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../Login/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import ImageHost from "../../Hooks/ImageHost";
import toast, { Toaster } from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import Heading from "../../Components/Heading";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { createUser } = useAuth();
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateUser = async (data) => {
    try {
      const image = { image: data.photo[0] };
      const userImage = await ImageHost(image);
      const result = await createUser(data.email, data.password);
      const { user } = result;
      await updateProfile(user, {
        displayName: data.name,
        photoURL: userImage,
      });
      const userInfo = {
        name: data.name,
        email: data.email,
        image: userImage,
        role: "user",
      };
      const res = await axios.post("/api/v1/users", userInfo);
      if (res.data.insertedId) {
        toast.success("Registered Successfully!!!");
        navigate("/");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="hero relative bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url(https://i.ibb.co/pxCYXmq/pexels-photo-268533.jpg)`,
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>

      <div className="">
        <HelmetProvider
          helmetTitle={"Polling Survey || Login"}
        ></HelmetProvider>
        <Heading mainHeading={"Login Now"}></Heading>
        <div className="flex justify-between gap-10">
          <form
            onSubmit={handleSubmit(handleCreateUser)}
            className=" flex-1 space-y-4 shadow-lg p-10  bg-opacity-75 backdrop-blur-md rounded-md text-white md:max-w-xl"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="name"
                {...register("name", { required: true })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="mt-5 absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                autoComplete="user"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <label className="block text-sm font-medium">
                  Upload An Picture
                </label>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                {...register("photo")}
              />
              {errors.photo && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                className="mr-2"
              />
              <label htmlFor="acceptTerms" className="text-sm">
                Accept Terms and Conditions
              </label>
            </div>

            <button
              type="submit"
              className="btn w-full bg-[#D1A054] hover:bg-[#D2A000]"
            >
              Register
            </button>

            <div className="text-center">
              <p>
                Don&#39;t have an account?{" "}
                <Link to={"/login"} className="text-[#D1A054]">
                  Login Now
                </Link>
              </p>
              <h3>Or login in with</h3>
            </div>

            <SocialLogin></SocialLogin>
          </form>
          <div className="flex-1 w-full md:block hidden">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              alt="Phone image"
            />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
