import React, { useState, useEffect } from "react";
import { paymentIntent } from "../../services/accountServices";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  // Stripe object, use stripe.confirmCardPayment etc
  const stripe = useStripe();
  const elements = useElements();

  //! Check if the payment enter screen is opened, then send intent..
  //! Dont let them submit until we have an intent saved. (check first).  -- Make a payment screen?
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userDetails, setUserDetails] = useState();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentCode, setPaymentCode] = useState<string>("");

  // Only one product so we can create payment intent for this.
  const createPaymentIntent = async () => {
    const pi = await paymentIntent();
    console.log(pi);
  };

  // Handle user clicking the buy button with card details.
  const handlePurchase = async () => {
    setProcessing(true);

    const cardElement = elements!.getElement(CardNumberElement);

    // Confirm payment using the card and payment intent that was returned
    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
      },
    });

    console.log(payload);

    setProcessing(false);

    if (payload.error) return setError(`Payment failed: ${payload.error.message}`);
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  return null;
}
