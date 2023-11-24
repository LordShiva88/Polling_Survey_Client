import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import Container from "../../Components/Container";
import { useForm } from "react-hook-form";
import HelmetProvider from "../../Components/HelmetProvider";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const onSubmit = (data) => {
    console.log(data.email, data.password, data.captcha);
    if (validateCaptcha(data.captcha)) {
      logIn(data.email, data.password)
        .then((res) => {
          console.log(res);
          toast.success("Login Successful");
          navigate(from, { replace: true });
        })
        .catch((error) => toast.error(error.message));
    } else {
      toast.error("Captcha Does not match");
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
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 shadow-lg p-4"
          >
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

            <div className="relative">
              <LoadCanvasTemplate />
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
              <label htmlFor="acceptTerms" className="text-sm text-gray-600">
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
        </div>

        <div className="flex-1 hidden md:block">
          <img src="" alt="" className="" />
        </div>
      </div>
    </Container>
  );
};

export default Login;
