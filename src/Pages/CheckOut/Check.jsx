import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Heading from "../../Components/Heading";
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
    return;
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
          toast.success(`User Role Updated SuccessFul ${role}`);
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
        toast.success(`Payment Successful id ${paymentIntent.id}`);
        handleRole();
      }
    }
  };

  return (
    <div>
      <Heading subHeading={"Payment"} mainHeading={"Payment"}></Heading>
      <form onSubmit={handleSubmit} className="">
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
        <button
          className="btn"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-500">{error}</p>
      </form>
    </div>
  );
};

export default Check;
