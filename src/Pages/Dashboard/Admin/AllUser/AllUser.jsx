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
    <div className="">
      <div className="">
        {/* <HeadingTitle
          mainTitle={"All Users"}
          subTitle={"---My Cart---"}
        ></HeadingTitle> */}
        <div className="px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold mr-4">
              Total User: {users.length}
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
        </div>
        <div className="overflow-x-auto mt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-base-200">
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length == 0 && <>There Are No your Role add yet</>}
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.image} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <h2 className="font-bold">{user.name}</h2>
                    <h2 className="font-bold">{user.email}</h2>
                  </td>
                  <td>
                    <label className="label">
                      <span className="label-text">Change User role</span>
                    </label>
                    <div className="dropdown">
                      <label tabIndex={0} className="btn m-1">
                        <span className="flex">
                          {user?.role} <FaAngleDown></FaAngleDown>
                        </span>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <button
                            onClick={() => handleRole(user._id, "Surveyor")}
                          >
                            Surveyor
                          </button>
                        </li>
                        <li>
                          <button onClick={() => handleRole(user._id, "Admin")}>
                            Admin
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-ghost"
                    >
                      <AiOutlineDelete className="text-2xl text-red-500"></AiOutlineDelete>
                    </button>
                  </th>
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
