import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useForm } from "react-hook-form";
import HelmetProvider from "../../Components/HelmetProvider";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Heading from "../../Components/Heading";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  console.log(from);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const onSubmit = (data) => {
    if (validateCaptcha(data.captcha)) {
      logIn(data.email, data.password)
        .then((res) => {
          if (res.user) {
            toast.success("Login Successful");
            navigate(from);
          }
        })
        .catch((error) => toast.error(error.message));
    } else {
      toast.error("Captcha Does not match");
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
            onSubmit={handleSubmit(onSubmit)}
            className=" flex-1 space-y-4 shadow-lg p-10  bg-opacity-75 backdrop-blur-md rounded-md text-white md:max-w-xl"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium ">
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
              <label htmlFor="password" className="block text-sm font-medium ">
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

            <div className="relative">
              <LoadCanvasTemplate />
              <input
                type="text"
                className="mt-1 p-2 w-full border text-black border-gray-300 rounded-md"
                {...register("captcha", { required: true })}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                className="mr-2"
              />
              <label htmlFor="acceptTerms" className="text-sm ">
                Accept Terms and Conditions
              </label>
            </div>
            <button
              type="submit"
              className="btn w-full bg-[#D1A054] hover:bg-[#D2A000]"
            >
              Login
            </button>

            <div className="text-center">
              <p>
                Don&#39;t have an account?{" "}
                <Link to={"/register"} className="text-[#D1A054]">
                  Register Now
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
    </div>
  );
};

export default Login;
