import React, { useState, FunctionComponent, ChangeEvent } from "react";
import { AccountTerminalWindow, AccountCrossButton } from "./styles/styles";
import { AccountInput } from "./styles/CheckoutForm.styles";
import { SubHeading } from "../styles/styles";
import { IPopupWindow } from "./types/types";
import { DarkBackground, CheckoutMainWindow, AccountBuyButton } from "./styles/CheckoutForm.styles";
import { changePassword } from "./services/services";

// This is very similar to the email form, maybe combine them into one?
const PasswordForm: FunctionComponent<IPopupWindow> = ({ theme, closeWindow }) => {
  const [processing, setProcessing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const onChangePasswords = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setPasswordData({ ...passwordData, [target.id]: target.value });
  };

  const changeUserPassword = async () => {
    setProcessing(true);
    const changedPassword = await changePassword(
      passwordData.currentPassword,
      passwordData.newPassword,
      passwordData.newPasswordConfirm
    );
    console.log(changedPassword);
    setProcessing(false);
  };

  return (
    <DarkBackground>
      <CheckoutMainWindow theme={theme}>
        <AccountCrossButton onClick={() => closeWindow(false)}>X</AccountCrossButton>
        <AccountTerminalWindow theme={theme}>
          <SubHeading>Change password?</SubHeading>
        </AccountTerminalWindow>

        <AccountInput id="currentPassword" placeholder="Current Password" theme={theme} onChange={onChangePasswords} />
        <AccountInput id="newPassword" placeholder="Desired Password" theme={theme} onChange={onChangePasswords} />
        <AccountInput
          id="newPasswordConfirm"
          placeholder="Confirm Desired Password"
          theme={theme}
          onChange={onChangePasswords}
        />
        <AccountBuyButton onClick={() => changeUserPassword()} theme={theme}>
          {processing ? "Please Wait" : "Submit"}
        </AccountBuyButton>
      </CheckoutMainWindow>
    </DarkBackground>
  );
};

export default PasswordForm;
