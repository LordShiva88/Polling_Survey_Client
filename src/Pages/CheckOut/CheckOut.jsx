import { FaMoneyBill, FaUser } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";

import { TfiEmail } from "react-icons/tfi";
import Container from "../../Components/Container/Container";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
const CheckOut = () => {

  const {user, loading} = useAuth();
  const navigate = useNavigate();

  if(loading){
    return <p>Loading</p>
  }

  const facility = [
    " Participate in a survey.",
    "Like or dislike a survey.",
    "Report a survey.",
    "Comment on a survey (Pro users only).",
  ];
  return (
    <div className="flex flex-col lg:flex-row mb-10 justify-center gap-4">
      <div className="flex flex-col items-center bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100 p-8 rounded-lg shadow-lg relative border-8 border-orange-200 mt-32">
        <div className="flex flex-col items-start justify-between gap-4 mb-6 lg:flex-row">
          <div>
            <h3 className="text-2xl font-semibold jakarta sm:text-4xl">
              Pro Plan
            </h3>
          </div>
        </div>
        <div className="mb-4 space-x-2">
          <span className="text-4xl font-bold text-indigo-500">$15/mo</span>
          <span className="text-2xl text-indigo-500 line-through">$39/mo</span>
        </div>
        <div className="flex flex-col gap-1 mt-5 space-y-3">
          {facility.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              <FcCheckmark className="text-xl" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Details */}
      <div className="flex flex-col items-center bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100 p-8 rounded-lg shadow-lg relative border-8 border-orange-200 lg:mt-32">
        <p className="text-xl font-medium">Payment Details</p>
        <p className="text-gray-600">
          Complete your order by providing your payment details.
        </p>

        <div className="mt-4 space-y-4">
          <label className="block text-sm font-medium">Email</label>
          <div className="relative">
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:ring focus:border-blue-500"
              defaultValue={user?.email}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <TfiEmail />
            </div>
          </div>
          <label className="block text-sm font-medium">Card Holder</label>
          <div className="relative">
            <input
              type="text"
              id="card-holder"
              name="card-holder"
              className="w-full rounded-md border border-gray-300 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:ring focus:border-blue-500"
              defaultValue={user?.displayName}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <FaUser />
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <label className="block text-sm font-medium">Card Number</label>
            <input
              type="text"
              id="card-no"
              name="card-no"
              className="w-full rounded-md border border-gray-300 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:ring focus:border-blue-500"
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
            <div className="pointer-events-none absolute top-8 left-0 inline-flex items-center px-3">
              <FaMoneyBill />
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="text"
                name="credit-expiry"
                className="w-full rounded-md border border-gray-300 px-2 py-3 text-sm shadow-sm outline-none focus:ring focus:border-blue-500"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">cvc</label>
              <input
                type="text"
                name="credit-cvc"
                className="w-full rounded-md border border-gray-300 px-2 py-3 text-sm shadow-sm outline-none focus:ring focus:border-blue-500"
                placeholder="CVC"
              />
            </div>
          </div>
        </div>

        <button className="mt-6 w-full rounded-md bg-blue-500 text-white px-6 py-3 font-medium">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
