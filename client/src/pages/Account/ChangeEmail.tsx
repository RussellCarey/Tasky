import React, { useState, FunctionComponent, ChangeEvent } from "react";
import { AccountTerminalWindow, AccountCrossButton } from "./styles/styles";
import { AccountInput } from "./styles/CheckoutForm.styles";
import { SubHeading } from "../styles/styles";
import { IPopupWindow } from "./types/types";
import { DarkBackground, CheckoutMainWindow, AccountBuyButton } from "./styles/CheckoutForm.styles";

import { changeEmail, changePassword } from "./services/services";

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

  const changeUserEmail = async () => {
    setProcessing(true);
    const changedEmail = await changeEmail(emailData.currentEmail, emailData.newEmail, emailData.newEmailConfirm);
    console.log(changedEmail);
    setProcessing(false);
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
        <AccountBuyButton onClick={() => changeUserEmail()} theme={theme}>
          {processing ? "Please Wait" : "Submit"}
        </AccountBuyButton>
      </CheckoutMainWindow>
    </DarkBackground>
  );
};

export default EmailForm;
