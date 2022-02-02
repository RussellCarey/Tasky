import React, { useState, FunctionComponent, ChangeEvent } from "react";
import { AccountTerminalWindow, AccountCrossButton } from "./styles/styles";
import { AccountInput } from "./styles/CheckoutForm.styles";
import { SubHeading } from "../styles/styles";
import { IPopupWindow } from "./types/types";
import { DarkBackground, CheckoutMainWindow, AccountBuyButton } from "./styles/CheckoutForm.styles";

const EmailForm: FunctionComponent<IPopupWindow> = ({ theme, closeWindow }) => {
  const [processing, setProcessing] = useState(false);
  const [emailData, setEmailData] = useState({
    currentEmail: "",
    newEmail: "",
    newEmailConfirm: "",
  });

  const onChangeEmails = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setEmailData({ ...emailData, [target.id]: target.value });
  };

  return (
    <DarkBackground>
      <CheckoutMainWindow theme={theme}>
        <AccountCrossButton onClick={() => closeWindow(false)}>X</AccountCrossButton>
        <AccountTerminalWindow theme={theme}>
          <SubHeading>Change email?</SubHeading>
        </AccountTerminalWindow>

        <AccountInput id="currentEmail" placeholder="Current Email" theme={theme} onChange={onChangeEmails} />
        <AccountInput id="newEmail" placeholder="Desired Email" theme={theme} onChange={onChangeEmails} />
        <AccountInput
          id="newEmailConfirm"
          placeholder="Confirm Desired Email"
          theme={theme}
          onChange={onChangeEmails}
        />
        <AccountBuyButton onClick={() => console.log("WOW")} theme={theme}>
          {processing ? "Please Wait" : "Submit"}
        </AccountBuyButton>
      </CheckoutMainWindow>
    </DarkBackground>
  );
};

export default EmailForm;
