import { NavLink, Outlet } from "react-router-dom";

import {
  FaBars,
  FaClipboardList,
  FaEnvelope,
  FaHome,
  FaInfo,
  FaMoneyBill,
  FaSurprise,
  FaUsers,
} from "react-icons/fa";
import logo from "../assets/image/logo.png";
import useAuth from "../Hooks/useAuth";
import Container from "../Components/Container";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading";

const Dashboard = () => {
  const user = useAuth();
  const { userRole, userRolePending } = useRole();
  if (userRolePending) {
    return <Loading></Loading>;
  }
  const role = userRole.userRole;
  const navLink = (
    <>
      {/* Dashboard for admin */}
      {user && role === "Admin" && (
        <>
          <li>
            <NavLink
              to="/dashboard/adminHome"
              className="flex items-center px-4 py-2 "
            >
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/users"
              className="flex items-center px-4 py-2 "
            >
              <FaUsers className="mr-2" />
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/surveyRequest"
              className="flex items-center px-4 py-2 "
            >
              <FaClipboardList className="mr-2" />
              Survey Request
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/allPayments"
              className="flex items-center px-4 py-2 "
            >
              <FaMoneyBill className="mr-2" />
              Payment
            </NavLink>
          </li>
        </>
      )}
      {/* Dashboard for Surveyor */}
      {user && role === "Surveyor" && (
        <>
          <li>
            <NavLink
              to="/dashboard/surveyorHome"
              className="flex items-center px-4 py-2"
            >
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/post"
              className="flex items-center px-4 py-2 "
            >
              <FaUsers className="mr-2" />
              Track My Survey
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/myPost"
              className="flex items-center px-4 py-2 "
            >
              <FaClipboardList className="mr-2" />
              My Posted
            </NavLink>
          </li>
        </>
      )}
      <div className="divider"></div>
      <li>
        <NavLink to="/" className="flex items-center px-4 py-2 ">
          <FaHome className="mr-2" />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/surveys" className="flex items-center px-4 py-2 ">
          <FaSurprise className="mr-2" />
          Surveys
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="flex items-center px-4 py-2 ">
          <FaEnvelope className="mr-2" />
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="flex items-center px-4 py-2 ">
          <FaInfo className="mr-2" />
          About
        </NavLink>
      </li>
    </>
  );
  return (
    <Container>
      <div>
        {/* Mobile navigation */}
        <div className="drawer md:hidden">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content min-w-fit flex flex-col">
            <div className="w-full navbar bg-base-300">
              <div className="flex-none navbar-start">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <FaBars></FaBars>
                </label>
              </div>
              <div className="flex-1 px-2 mx-2 navbar-end">
                <img src={logo} alt="" className="w-10" />
                <h1>SURVEY SIFT</h1>
              </div>
            </div>
            <Outlet></Outlet>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-gray-500 h-screen fixed z-10 px-5 text-white space-y-3">
              <div className="flex items-center gap-2">
                <img src={logo} alt="" className="w-10" />
                <p className="text-xl font-bold text-red-400">Survey Sift</p>
              </div>
              {navLink}
            </ul>
          </div>
        </div>
        {/* Desktop navigation */}
        <div className="hidden md:flex gap-5">
          <div className="">
            <ul className="menu bg-gray-500 h-screen px-5 text-white space-y-3 w-52 fixed">
              <div className="flex items-center gap-2">
                <img src={logo} alt="" className="w-10" />
                <p className="text-xl font-bold text-red-400">Survey Sift</p>
              </div>
              {navLink}
            </ul>
          </div>
          <div className="w-full ml-52">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
