import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./checkoutForm";

const PUBLIC_KEY =
  "pk_test_51J7FzsJDNVUDfVJFNKRLXndQIkkcp6TeCv9ACkY2DozYmZuu85nbyMMG8t8YFdY6qmqyyO8MkBVggDOezfprHRhB008HAJWl6O";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeContainer;
