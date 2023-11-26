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

const Dashboard = () => {
  const user = useAuth();
  const admin = true;
  const surveyor = true;
  const navLink = (
    <>
      {/* Dashboard for admin */}
      {user && admin && (
        <>
          <li>
            <NavLink
              to="/dashboard/adminDashboard"
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
              to="/dashboard/payment"
              className="flex items-center px-4 py-2 "
            >
              <FaMoneyBill className="mr-2" />
              Payment
            </NavLink>
          </li>
        </>
      )}
      {/* Dashboard for admin */}
      {user && surveyor && (
        <>
          <li>
            <NavLink
              to="/dashboard/surveyorHome"
              className="flex items-center px-4 py-2 "
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
              Post A Survey
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
        <div className="drawer md:hidden">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
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
            <ul className="menu p-4  min-h-full bg-base-200">{navLink}</ul>
          </div>
        </div>
        <div className="flex">
          <div className="hidden md:block w-[200px]">
            <div>
              <ul tabIndex={0} className="menu p-4 bg-base-200 h-screen">
                {navLink}
              </ul>
            </div>
          </div>
          <div className="hidden md:block w-full">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
