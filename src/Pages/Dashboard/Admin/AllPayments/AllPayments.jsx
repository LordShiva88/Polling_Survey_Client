import { useState } from "react";
import Heading from "../../../../Components/Heading";
import { useEffect } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading";

const AllPayments = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/payment").then((res) => {
      setPayments(res.data)
      setLoading(false)
    });
  }, [axiosSecure]);

if(loading){
  return <Loading></Loading>
}

  return (
    <div>
      <Heading mainHeading={"All Payments"}></Heading>
      <div className="outer overflow-auto lg:w-full md:w-full sm:w-full lg:overflow-hidden">
        <div className="scrollable">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-lightGray-50 text-left">
                <th className="py-4 pl-6 font-medium text-left dark:text-gray-400">
                  User Info
                </th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">
                  Amount
                </th>
                <th className="px-6 py-4 font-medium dark:text-gray-400">
                  Transaction Id
                </th>
              </tr>
            </thead>
            
            <tbody>
              {payments.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-800"
                >
                  <td className="flex items-center px-6 py-3 font-medium">
                    {user.image ? (
                      <div className="ml-5 avatar">
                        <div className="rounded-full ring ring-primary ring-offset-blue-100 w-10 h-10">
                          <img src={user.image} alt={`${user.name}'s Avatar`} />
                        </div>
                      </div>
                    ) : (
                      <img
                        src="https://i.ibb.co/DMJ8ZRc/user.png"
                        alt="Default Avatar"
                        className="w-10 h-10 rounded-full ring ring-primary ring-offset-blue-100"
                      />
                    )}
                    <div className="ml-4">
                      <p className="text-sm font-medium dark:text-gray-400">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm font-medium dark:text-gray-400">
                    <span className="inline-block px-2 py-1 text-blue-700 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-gray-400 font-bold">
                      15 $
                    </span>
                  </td>
                  <td className="px-6 py-3 font-bold ">
                    ID: {user.transitionId}
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

export default AllPayments;
