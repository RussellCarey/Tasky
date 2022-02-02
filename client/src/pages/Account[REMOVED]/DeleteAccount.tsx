import { useState, FunctionComponent } from "react";
import { AccountTerminalWindow, AccountCrossButton } from "./styles/styles";
import { SubHeading } from "../styles/styles";
import { IPopupWindow } from "./types/types";
import { DarkBackground, CheckoutMainWindow, AccountBuyButton } from "./styles/CheckoutForm.styles";
import { deleteAccount } from "./services/services";

const DeleteForm: FunctionComponent<IPopupWindow> = ({ theme, closeWindow }) => {
  const [processing, setProcessing] = useState(false);

  const deleteUserAccount = async () => {
    setProcessing(true);
    console.log("Deleting account");
    const deletedAccount = await deleteAccount();
    console.log(deletedAccount);
    setProcessing(false);
  };

  return (
    <DarkBackground>
      <CheckoutMainWindow theme={theme}>
        <AccountCrossButton onClick={() => closeWindow(false)}>X</AccountCrossButton>
        <AccountTerminalWindow theme={theme}>
          <SubHeading>Delete Account?</SubHeading>
        </AccountTerminalWindow>
        <AccountBuyButton onClick={() => deleteUserAccount()} theme={theme}>
          {processing ? "Please Wait" : "Delete Account"}
        </AccountBuyButton>
      </CheckoutMainWindow>
    </DarkBackground>
  );
};

export default DeleteForm;
