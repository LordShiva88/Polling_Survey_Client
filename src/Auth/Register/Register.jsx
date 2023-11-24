import { useState } from "react";
import { useForm } from "react-hook-form";
import Container from "../../Components/Container/Container";
import HelmetProvider from "../../Components/HelmetProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../Login/SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import ImageHost from "../../Hooks/ImageHost";
import toast, { Toaster } from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";

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
    <Container>
      <div
        className="flex md:flex-row flex-col items-center"
        style={{
          backgroundImage: `url(${""})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="md:max-w-xl w-full p-10 flex-1">
          <HelmetProvider
            helmetTitle={"Polling Survey || Login"}
          ></HelmetProvider>

          <h1 className="text-2xl font-bold mb-8 text-center">Login</h1>

          <form
            onSubmit={handleSubmit(handleCreateUser)}
            className="space-y-4 shadow-lg p-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
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
                <label className="block text-sm font-medium text-gray-600">
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
              <label htmlFor="acceptTerms" className="text-sm text-gray-600">
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
        </div>

        <div className="flex-1 hidden md:block">
          <img src="" alt="" className="" />
        </div>
      </div>
      <Toaster />
    </Container>
  );
};

export default Register;
