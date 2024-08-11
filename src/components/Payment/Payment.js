import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
// import {clearCartUponPaymentSuccess}from '../Product/cartUtils'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.


const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51OA8e8SJVcHn9TNrqwY5g33ivnVp3WtEkryW24AImHqtdW0UjwIVVYQ8opjeZvm5YVS8WwirGiVN07oxAiEQWXUX00cJ4C63FZ"
  );
  const [clientSecret, setClientSecret] = useState("");
  const UserIdGet = JSON.parse(localStorage.getItem("user_login_record"));
  const UserId = UserIdGet?._id;

  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    fetch(`${process.env.REACT_APP_API_URL}/create-checkout-session/` + UserId, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("----- data", data);
        setClientSecret(data.clientSecret);
      });
      // clearCartUponPaymentSuccess()
      
  }, []);

  const options = { clientSecret };

  return (
    <>
      <div id="checkout">
        {clientSecret && (
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </div>
      
    </>
  );
};

export default Payment;
