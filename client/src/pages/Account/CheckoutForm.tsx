import React, { useState, useEffect, FunctionComponent, ChangeEvent } from "react";
import { getPaymentIntent } from "../../services/dbServices";
import { CardNumberElement, useStripe, useElements } from "@stripe/react-stripe-js";

import {
  DarkBackground,
  CheckoutTerminalWindow,
  AccountCardNumberElement,
  AccountCVCNumber,
  AccountCardExpiry,
} from "./styles/CheckoutForm.styles";

import { AccountInput } from "./styles/CheckoutForm.styles";

//! CHANGEANINFIENE
interface IProps {
  theme: any;
}

const CheckoutForm: FunctionComponent<IProps> = ({ theme }) => {
  // Stripe object, use stripe.confirmCardPayment etc
  const stripe = useStripe();
  const elements = useElements();

  //! Check if the payment enter screen is opened, then send intent..
  //! Dont let them submit until we have an intent saved. (check first).  -- Make a payment screen?
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userDetails, setUserDetails] = useState({
    fullname: "",
    line1: "",
    line2: "",
    city: "",
    postcode: "",
    country: "",
    state: "",
  });

  // Only one product so we can create payment intent for this.
  const createPaymentIntent = async () => {
    const pi = await getPaymentIntent(userDetails);
    return pi.data.data;
  };

  // Handle user clicking the buy button with card details.
  const handlePurchase = async () => {
    setProcessing(true);

    // Get a payment intent from the server.
    const clientSecret = await createPaymentIntent();
    if (!clientSecret) return setError("Error with payment, please try again. ");

    // Get all stripe IFRAME react elements.
    const cardElement = elements!.getElement(CardNumberElement);

    // Send user details and card numbers for checking.
    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
      },
    });

    setProcessing(false);

    // Error
    if (payload.error) return setError(`Payment failed: ${payload.error.message}`);

    // Sucess??
  };

  const onChangeInputs = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setUserDetails({ ...userDetails, [target.id]: target.value });
  };

  return (
    <DarkBackground>
      <CheckoutTerminalWindow theme={theme}>
        <AccountInput id="fullname" placeholder="Full Name" theme={theme} onChange={onChangeInputs} />
        <AccountInput id="line1" placeholder="Line 1" theme={theme} onChange={onChangeInputs} />
        <AccountInput id="line2" placeholder="Line 2" theme={theme} onChange={onChangeInputs} />
        <AccountInput id="city" placeholder="City" theme={theme} onChange={onChangeInputs} />
        <AccountInput id="postcode" placeholder="Post Code" theme={theme} onChange={onChangeInputs} />
        <AccountInput id="country" placeholder="Country" theme={theme} onChange={onChangeInputs} />
        <AccountCardNumberElement theme={theme} />
        <AccountCVCNumber theme={theme} />
        <AccountCardExpiry theme={theme} />
        <button onClick={() => handlePurchase()}>{processing ? "Please Wait" : "Click to buy"}</button>
      </CheckoutTerminalWindow>
    </DarkBackground>
  );
};

export default CheckoutForm;
