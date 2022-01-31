import { useState, useEffect, FunctionComponent, useContext } from "react";
import ThemeContext from "../../context/theme/themeContext";
import { Main, SubHeading } from "../styles/styles";
import { MainWindow, AccountTerminalWindow, AccountButton } from "./styles/styles";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const AccountsPage: FunctionComponent = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  const stripePromise = loadStripe(
    "pk_test_51KNWhcLDODnvjffbUbztYMavuGapXRvYcp2tLpAtlVXqWsSJ67sApOnTV5lnJRITLwVpBVJ8HHrbfgFhy8I0jUUx00FhK3noVA"
  );

  return (
    <>
      {showCheckout ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm theme={theme} />
        </Elements>
      ) : null}

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

          <AccountButton onClick={() => setShowCheckout(!showCheckout)}>
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
    </>
  );
};

export default AccountsPage;
