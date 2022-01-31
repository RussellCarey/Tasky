import React, { useState, useEffect, FunctionComponent, ChangeEvent } from "react";
import { paymentIntent } from "../../services/accountServices";
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
  const [userDetails, setUserDetails] = useState();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentCode, setPaymentCode] = useState<string>("");

  // Only one product so we can create payment intent for this.
  const createPaymentIntent = async () => {
    const pi = await paymentIntent();
    console.log(pi.data);
    setClientSecret(pi.data.data);
  };

  const onChange = (e: any) => {
    const { errorMessage } = e;
    console.log(errorMessage);
    setError(error ? errorMessage.message : "");
  };

  // Handle user clicking the buy button with card details.
  const handlePurchase = async () => {
    setProcessing(true);
    console.log("HANDLEING PURCHSE");
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

  return (
    <DarkBackground>
      <CheckoutTerminalWindow theme={theme}>
        <AccountInput placeholder="Full Name" theme={theme} />
        <AccountInput placeholder="Email" theme={theme} />
        <AccountCardNumberElement theme={theme} />
        <AccountCVCNumber theme={theme} />
        <AccountCardExpiry theme={theme} />
        <button onClick={() => handlePurchase()}>BUY</button>
      </CheckoutTerminalWindow>
    </DarkBackground>
  );
};

export default CheckoutForm;
