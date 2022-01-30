import { useState, useEffect, FunctionComponent, useContext } from "react";
import ThemeContext from "../../context/theme/themeContext";
import { Main, SubHeading } from "../styles/styles";
import { MainWindow, AccountTerminalWindow, AccountButton } from "./styles/styles";

const AccountsPage: FunctionComponent = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;
  const [userDetails, setUserDetails] = useState();
  const [paymentCode, setPaymentCode] = useState<string>("");

  useEffect(() => {}, []);

  return (
    <Main theme={theme}>
      <MainWindow theme={theme}>
        <AccountTerminalWindow>
          <SubHeading>Account</SubHeading>
        </AccountTerminalWindow>

        <AccountTerminalWindow>
          <SubHeading>name: Russell Carey</SubHeading>
        </AccountTerminalWindow>

        <AccountTerminalWindow>
          <SubHeading>email: russell_carey@hotmail.co.uk</SubHeading>
        </AccountTerminalWindow>

        <AccountButton>
          <SubHeading>Upgrade Account?</SubHeading>
        </AccountButton>

        <AccountButton>
          <SubHeading>Change email?</SubHeading>
        </AccountButton>

        <AccountButton>
          <SubHeading>Change Password?</SubHeading>
        </AccountButton>
      </MainWindow>
    </Main>
  );
};

export default AccountsPage;
