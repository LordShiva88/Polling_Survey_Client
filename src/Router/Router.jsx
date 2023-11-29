import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import Surveys from "../Pages/Surveys/Surveys";
import SurveysDetails from "../Pages/SurveysDetails/SurveysDetails";
import Dashboard from "../Layout/Dashboard";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard/AdminDashboard";
import Home from "../Pages/Home/Home/Home";
import SurveyorHome from "../Pages/Dashboard/Surveyor/SurveyorHome/SurveyorHome";
import MyPost from "../Pages/Dashboard/Surveyor/MyPost/MyPost";
import UpdateSurvey from "../Pages/Dashboard/Surveyor/UpdateSurvey/UpdateSurvey";
import AllUser from "../Pages/Dashboard/Admin/AllUser/AllUser";
import AllSurveyRequest from "../Pages/Dashboard/Admin/AllSurveyRequest/AllSurveyRequest";
// import Payment from "../Pages/Dashboard/Admin/Payment/Payment";
import CheckOut from "../Pages/CheckOut/CheckOut";
import PrivateRouter from "./PrivateRouter";
import AdminRouter from "./AdminRouter";
import TrackSurvey from "../Pages/Dashboard/Surveyor/TrackSurvey/TrackSurvey";
import Error from "../Pages/Error/Error";
import Payment from "../Pages/CheckOut/Payment";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/surveys",
        element: <Surveys></Surveys>,
      },
      {
        path: "/surveysDetails/:id",
        element: <SurveysDetails></SurveysDetails>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRouter>
            <CheckOut></CheckOut>
          </PrivateRouter>
        ),
      },
      {
        path: "/check",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "adminHome",
        element: (
          <AdminRouter>
            <AdminDashboard></AdminDashboard>
          </AdminRouter>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRouter>
            <AllUser></AllUser>
          </AdminRouter>
        ),
      },
      {
        path: "surveyRequest",
        element: (
          <AdminRouter>
            {" "}
            <AllSurveyRequest></AllSurveyRequest>
          </AdminRouter>
        ),
      },
      {
        path: "payment",
        element: (
          <AdminRouter>
            <Payment></Payment>
          </AdminRouter>
        ),
      },

      // Surveyor Dashboard
      {
        path: "surveyorHome",
        element: <SurveyorHome></SurveyorHome>,
      },
      {
        path: "post",
        element: <TrackSurvey></TrackSurvey>,
      },
      {
        path: "myPost",
        element: (
          <PrivateRouter>
            <MyPost></MyPost>
          </PrivateRouter>
        ),
      },
      {
        path: "updateSurvey/:id",
        element: <UpdateSurvey></UpdateSurvey>,
      },
    ],
  },
]);

export default Router;
