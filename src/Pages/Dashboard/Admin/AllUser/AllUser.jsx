import { AiOutlineDelete } from "react-icons/ai";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import Loading from "../../../../Components/Loading";
import useAllUser from "../../../../Hooks/useAllUser";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, usersPending, userFetch] = useAllUser(roleFilter);
  const handleRole = (id, role) => {
    const userRole = {
      role: role,
    };
    axiosSecure
      .patch(`/api/v1/users/${id}`, userRole)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success(`User Role Updated SuccessFul ${role}`);
          userFetch();
        }
      })
      .catch((error) => console.error(error));
  };

  if (usersPending) {
    return <Loading></Loading>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/api/v1/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            userFetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Total Users: {users.length}</h2>
        <div className="flex items-center">
          <label htmlFor="roleFilter" className="mr-2">
            Filter by Role:
          </label>
          <select
            id="roleFilter"
            onChange={(e) => setRoleFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All</option>
            <option value="user">Normal User</option>
            <option value="Admin">Admin</option>
            <option value="Pro User">Pro User</option>
            <option value="Surveyor">Surveyor</option>
          </select>
        </div>
      </div>
      <section className="items-center lg:flex bg-blue-50 font-poppins dark:bg-gray-800">
        <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="overflow-x-auto overflow-y-auto rounded shadow dark:bg-gray-900 bg-white max-h-screen">
            <table className="w-full table-auto">
              <thead className="bg-lightGray-50">
                <tr className="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                  <th className="flex items-center py-4 pl-6 font-medium dark:text-gray-400">
                    <span>User Info</span>
                  </th>
                  <th className="px-6 py-4 font-medium dark:text-gray-400">
                    User Role
                  </th>
                  <th className="px-6 py-4 font-medium dark:text-gray-400">
                    Actions
                  </th>
                  <th className="px-6 py-4 font-medium dark:text-gray-400">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 dark:border-gray-800"
                  >
                    <td className="flex items-center px-6 py-3 font-medium">
                      <input className="mr-4" type="checkbox" name="" id="" />
                      <div className="flex">
                        <img
                          className="object-cover w-10 h-10 mr-4 rounded-full"
                          src={user.image}
                          alt=""
                        />
                        <div>
                          <p className="text-sm font-medium dark:text-gray-400">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 text-sm font-medium dark:text-gray-400">
                      <span className="inline-block px-2 py-1 text-blue-700 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-gray-400">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 ">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRole(user._id, "Surveyor")}
                          className="btn"
                        >
                          Surveyor
                        </button>
                        <button
                          className="btn"
                          onClick={() => handleRole(user._id, "Admin")}
                        >
                          Admin
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-ghost"
                      >
                        <AiOutlineDelete className="text-2xl text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="outer" style={{ width: "501px", overflow: "auto" }}>
        <div className="scrollable">
          <table style={{ tableLayout: "fixed", width: "100%" }}>
            <thead className="">
              <tr className="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                <th className="flex items-center py-4 pl-6 font-medium dark:text-gray-400">
                  <span>User Info</span>
                </th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">
                  User Role
                </th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">
                  Actions
                </th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <td className="flex items-center px-6 py-3 font-medium">
                    <input className="mr-4" type="checkbox" name="" id="" />
                    <div className="flex">
                      <img
                        className="object-cover w-10 h-10 mr-4 rounded-full"
                        src={user.image}
                        alt=""
                      />
                      <div>
                        <p className="text-sm font-medium dark:text-gray-400">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 text-sm font-medium dark:text-gray-400">
                    <span className="inline-block px-2 py-1 text-blue-700 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-gray-400">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 ">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRole(user._id, "Surveyor")}
                        className="btn"
                      >
                        Surveyor
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleRole(user._id, "Admin")}
                      >
                        Admin
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-ghost"
                    >
                      <AiOutlineDelete className="text-2xl text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="outer overflow-auto lg:w-full md:w-full sm:w-full lg:overflow-hidden md:overflow-hidden">
        <div className="scrollable">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-lightGray-50">
                <th className="py-4 pl-6 font-medium text-left dark:text-gray-400">
                  User Info
                </th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">
                  User Role
                </th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">
                  Action
                </th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <td className="flex items-center px-6 py-3 font-medium">
                    <input className="mr-4" type="checkbox" name="" id="" />
                    <div className="flex">
                      <img
                        className="object-cover w-10 h-10 mr-4 rounded-full"
                        src={user.image}
                        alt=""
                      />
                      <div>
                        <p className="text-sm font-medium dark:text-gray-400">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 text-sm font-medium dark:text-gray-400">
                    <span className="inline-block px-2 py-1 text-blue-700 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-gray-400">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 ">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRole(user._id, "Surveyor")}
                        className="btn"
                      >
                        Surveyor
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleRole(user._id, "Admin")}
                      >
                        Admin
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-ghost"
                    >
                      <AiOutlineDelete className="text-2xl text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
