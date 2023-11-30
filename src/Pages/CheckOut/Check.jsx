import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Check = () => {
  const { user, loading } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const price = 15;

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", {
        price: price,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, price]);

  if (loading) {
    return null;
  }

  const handleRole = () => {
    const role = "Pro User";
    const userRole = {
      role: role,
      email: user?.email,
    };
    axiosSecure
      .patch(`/api/v1/users`, userRole)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success(`User Role Updated Successfully ${role}`);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setError(error.message);
    } else {
      console.log(paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("Error Payment");
    } else {
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          transitionId: paymentIntent.id,
          name: user?.displayName,
          email: user?.email,
          time: paymentIntent.created,
        };
        axiosSecure.post("/payment", paymentInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success(`Payment Successful id ${paymentIntent.id}`);
            handleRole();

          }
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-6">
          <label
            htmlFor="card-number"
            className="block text-lg font-semibold mb-2 text-gray-700"
          >
            Card Details
          </label>
          <div className="bg-white rounded-md shadow-md p-3">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </div>

        <button
          className="btn btn-outline w-full mt-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-500 mt-2">{error}</p>
      </form>
    </div>
  );
};

export default Check;
