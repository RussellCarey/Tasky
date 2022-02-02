import { useState, FunctionComponent, ChangeEvent } from "react";
import { getPaymentIntent } from "./services/dbServices";
import { CardNumberElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { IPopupWindow, IUserDetails } from "./types/types";
import { DefaultUserObject } from "./constants/constants";
import { useNavigate } from "react-router-dom";
import {
  DarkBackground,
  AccountCardNumberElement,
  AccountCVCNumber,
  AccountCardExpiry,
  CheckoutMainWindow,
  AccountBuyButton,
} from "./styles/CheckoutForm.styles";

import { AccountInput } from "./styles/CheckoutForm.styles";
import { AccountCrossButton, AccountTerminalWindow } from "./styles/styles";
import { SubHeading, Text } from "../styles/styles";

const CheckoutForm: FunctionComponent<IPopupWindow> = ({ theme, closeWindow }) => {
  // Stripe object, use stripe.confirmCardPayment etc
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userDetails, setUserDetails] = useState<IUserDetails>(DefaultUserObject);

  // Only one product so we can create payment intent for this.
  const createPaymentIntent = async () => {
    const pi = await getPaymentIntent(userDetails);
    return pi.data.data;
  };

  // Handle user clicking the buy button with card details.
  const handlePurchase = async () => {
    try {
      setProcessing(true);

      const clientSecret = await createPaymentIntent();
      if (!clientSecret) return setError("Error with payment, please try again. ");

      const cardElement = elements!.getElement(CardNumberElement);
      const payload = await stripe!.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement! },
      });

      if (payload.paymentIntent!.status === "succeeded") {
        setProcessing(false);
        navigate("/success", { replace: true });
      }
    } catch (error: any) {
      setProcessing(false);
      console.log(error.response);
    }
  };

  const onChangeInputs = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setUserDetails({ ...userDetails, [target.id]: target.value });
  };

  return (
    <DarkBackground>
      <CheckoutMainWindow theme={theme}>
        <AccountCrossButton onClick={() => closeWindow(false)}>X</AccountCrossButton>
        <AccountTerminalWindow theme={theme}>
          <SubHeading>Upgrade to unlimited.</SubHeading>
        </AccountTerminalWindow>
        <AccountTerminalWindow theme={theme}>
          <Text style={{ marginBottom: "22px" }}>
            Remove all limits on number of tasks you can have and go unlimited!
          </Text>
          <Text style={{ marginBottom: "22px" }}>Please enter your billing details below.</Text>
          <Text>
            Notice: This is a dummy payment system using stripe API payments. For the card number just enter 42
            repeated. For the CVC, 424 and for the year and month, anything.
          </Text>
        </AccountTerminalWindow>

        <AccountInput id="fullname" placeholder="Full Name" theme={theme} onChange={onChangeInputs} />
        <AccountInput id="line1" placeholder="Line 1" theme={theme} onChange={onChangeInputs} />
        <AccountInput id="line2" placeholder="Line 2" theme={theme} onChange={onChangeInputs} />
        <AccountInput id="city" placeholder="City" theme={theme} onChange={onChangeInputs} />
        <AccountInput id="postcode" placeholder="Post Code" theme={theme} onChange={onChangeInputs} />
        <AccountInput id="country" placeholder="Country" theme={theme} onChange={onChangeInputs} />
        <AccountCardNumberElement theme={theme} />
        <AccountCVCNumber theme={theme} />
        <AccountCardExpiry theme={theme} />
        <AccountBuyButton onClick={() => handlePurchase()} theme={theme}>
          {processing ? "Please Wait" : "Click to buy"}
        </AccountBuyButton>
      </CheckoutMainWindow>
    </DarkBackground>
  );
};

export default CheckoutForm;
