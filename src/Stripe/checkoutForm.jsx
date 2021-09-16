import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { toast } from "react-toastify";
import { useParams } from "react-router";

export const CheckoutForm = (props) => {
  const { innerHeight: height } = window;
  const { userId } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  let [loading, setLoading] = useState(false);
  const finishPayment = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const response = await axios.post(
        "http://soscry.ap-south-1.elasticbeanstalk.com//api/v1/create-payment-intent",
        {
          userId: userId,
        }
      );
      const { clientSecret } = response.data?.body;
      stripe
        .confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        })
        .then(function (result) {
          if (result?.paymentIntent) {
            switch (result?.paymentIntent?.status) {
              case "succeeded":
                toast.success("Payment Confirmed!");
                break;
              case "canceled":
                toast.error("Payment Failed");
                break;
              case "processing":
                toast.warning("Payment Processing");
                break;
              default:
                toast.warning(`Payment ${result?.paymentIntent?.status}`);
            }
          }
          if (result?.error) {
            toast.error(result?.error?.message);
          }
        });
    } else {
      toast.error(error?.message);
    }
    setLoading(false);
  };

  return (
    <LoadingOverlay active={loading} spinner>
      {
        <form
          onSubmit={finishPayment}
          style={{ maxWidth: 400, margin: "0px auto", height: height }}
          className="pt-4"
        >
          <CardElement hidePostalCode={true} />
          <button className="btn btn-success w-100 mt-4">
            Confirm Payment
          </button>
        </form>
      }
    </LoadingOverlay>
  );
};
