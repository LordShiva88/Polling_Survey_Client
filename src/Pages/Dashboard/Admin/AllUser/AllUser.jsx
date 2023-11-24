import { useQuery } from "@tanstack/react-query";
import { AiOutlineDelete } from "react-icons/ai";

import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/users");
      return res.data;
    },
  });

  return (
    <div className="">
      <div className="">
        {/* <HeadingTitle
          mainTitle={"All Users"}
          subTitle={"---My Cart---"}
        ></HeadingTitle> */}
        <div className="px-8">
          <div className="flex justify-evenly">
            <h2 className="text-3xl font-semibold">Items: {users.length}</h2>
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
                    <select className="select select-info w-full max-w-xs">
                      <option disabled selected>
                        <span className="text">{user?.role}</span>
                      </option>
                      na
                      <option>
                        <button>Surveyor</button>
                      </option>
                      <option>
                        <button>Admin</button>
                      </option>
                      <option>
                        <button>Pro User</button>
                      </option>
                    </select>
                  </td>
                  <th>
                    <button
                      // onClick={() => handleDelete(user._id)}
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
