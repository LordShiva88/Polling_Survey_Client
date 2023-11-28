import { useQuery } from "@tanstack/react-query";
import { AiOutlineDelete } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";

import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import Loading from "../../../../Components/Loading";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState("all");

  const {
    data: users = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["users", roleFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/users?role=${roleFilter}`);
      return res.data;
    },
  });

  const handleRole = (id, role) => {
    const userRole = {
      role: role,
    };
    axiosSecure
      .patch(`/api/v1/users/${id}`, userRole)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success(`User Role Updated SuccessFul ${role}`);
          refetch();
        }
      })
      .catch((error) => console.error(error));
  };

  if (isPending) {
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
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto h-screen overflow-auto">
      <div className="px-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold">
            Total Users: {users.length}
          </h2>
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
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white">
            {/* head */}
            <thead>
              <tr className="bg-primary text-white">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 px-4 text-center">
                    There are no users for the selected role.
                  </td>
                </tr>
              )}
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <div className="w-12 h-12 overflow-hidden">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <h2 className="font-bold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center space-x-2">
                      <label className="label">
                        <span className="label-text">Change User Role</span>
                      </label>
                      <div className="dropdown">
                        <label tabIndex={0} className="btn m-1">
                          <span className="flex items-center">
                            {user?.role} <FaAngleDown />
                          </span>
                        </label>
                        <ul className="dropdown-content z-10 menu p-2 shadow bg-white rounded-box w-32">
                          <li>
                            <button
                              onClick={() => handleRole(user._id, "Surveyor")}
                            >
                              Surveyor
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleRole(user._id, "Admin")}
                            >
                              Admin
                            </button>
                          </li>
                        </ul>
                      </div>
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
