import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import Check from "./Check";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_STRIPE_PK);

const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Check></Check>
      </Elements>
    </div>
  );
};

export default Payment;
