import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { FaBars, FaCrown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../../assets/image/logo.png";
import useRole from "../../../Hooks/useRole";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [scrolling, setScrolling] = useState(false);
  const { userRole } = useRole();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogOut = () => {
    logOut()
      .then((res) => {
        console.log(res);
        toast.success("Logout Successful!!");
      })
      .catch((error) => console.error(error));
  };

  const navbarStyle = {
    backgroundColor: scrolling ? "white" : "rgba(0, 0, 0, 0.2)",
    color: scrolling ? "black" : "white",
  };

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/surveys", text: "Surveys" },
    { to: "/About", text: "About Us" },
    { to: "/contact", text: "Contact" },
  ];

  return (
    <div
      className="lg:px-12 md:px-6 navbar fixed z-10 text-golden font-bold uppercase p-5 opacity bg-white shadow-md"
      style={navbarStyle}
    >
      <div className="container mx-auto flex justify-between">
        <div className="hidden md:flex items-center">
          <img src={logo} alt="Logo" className="w-10 mr-2" />
          <span className="text-blue-700">Survey Sift</span>
        </div>
        <div className="">
          <div className="drawer md:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn drawer-button"
              >
                <FaBars className="text-xl"></FaBars>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-gray-500 h-screen px-5 text-white space-y-3 w-60 fixed">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="" className="w-10" />
                  <p className="text-xl font-bold text-red-400">Survey Sift</p>
                </div>
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        isActive
                          ? "border-0 border-b-4 border-blue-500 rounded-lg p-2 space-y-4"
                          : "hover:text-blue-500 transition duration-300 border-0 hover:border-b-4 hover:border-blue-500 rounded-lg p-2 space-y-4"
                      }
                    >
                      {link.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="hidden md:flex">
          <ul className="px-1 flex gap-10">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "border-0 border-b-4 border-blue-500 rounded-lg p-2"
                      : "hover:text-blue-500 transition duration-300 border-0 hover:border-b-4 hover:border-blue-500 rounded-lg p-2"
                  }
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <NavLink
            to={"/checkout"}
            className="btn flex items-center space-x-2 btn-outline btn-info"
          >
            <FaCrown /> PRO
          </NavLink>
          <div className="dropdown dropdown-end">
            <label
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user?.photoURL ? (
                  <div className="avatar">
                    <div className="rounded-full ring ring-primary ring-offset-blue-100 ">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                ) : (
                  <img
                    src="https://i.ibb.co/DMJ8ZRc/user.png"
                    alt="Default Avatar"
                  />
                )}
              </div>
            </label>

            {isDropdownOpen && (
              <div className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-black rounded-box w-52 text-white">
                <div className="flex flex-col items-center space-y-2 mb-5">
                  <div className="w-20 h-20 mt-4 flex justify-center items-center">
                    {user?.photoURL ? (
                      <img
                        src={user?.photoURL}
                        alt="User Avatar"
                        className="w-20 rounded-full border"
                      />
                    ) : (
                      <img
                        src="https://i.ibb.co/DMJ8ZRc/user.png"
                        alt="Default Avatar"
                      />
                    )}
                  </div>
                  <p>{user?.displayName}</p>
                </div>
                <li>
                  {user ? (
                    <button
                      className="hover:text-blue-500 transition duration-300 border-0 hover:border-b-4 hover:border-blue-500 rounded-lg p-2"
                      onClick={handleLogOut}
                    >
                      Log Out
                    </button>
                  ) : (
                    <Link
                      to={"/login"}
                      className="hover:text-blue-500 transition duration-300 border-0 hover:border-b-4 hover:border-blue-500 rounded-lg p-2"
                    >
                      Login
                    </Link>
                  )}
                </li>
                <li>
                  <Link
                    to={"/Register"}
                    className="hover:text-blue-500 transition duration-300 border-0 hover:border-b-4 hover:border-blue-500 rounded-lg p-2"
                  >
                    Register
                  </Link>
                </li>
                {user &&
                  (userRole.userRole === "Admin" ? (
                    <li>
                      <NavLink
                        to="/dashboard/adminHome"
                        className={({ isActive }) =>
                          isActive
                            ? "border-0 border-b-4 border-blue-500 rounded-lg p-2"
                            : "hover:text-blue-500 transition duration-300 border-0 hover:border-b-4 hover:border-blue-500 rounded-lg p-2"
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  ) : (
                    userRole.userRole === "Surveyor" && (
                      <li>
                        <NavLink
                          to="/dashboard/surveyorHome"
                          className={({ isActive }) =>
                            isActive
                              ? "border-0 border-b-4 border-blue-500 rounded-lg p-2"
                              : "hover:text-blue-500 transition duration-300 border-0 hover:border-b-4 hover:border-blue-500 rounded-lg p-2"
                          }
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    )
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
