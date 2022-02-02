import { useState, useEffect, FunctionComponent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../context/theme/themeContext";
import { Main, Text, SubHeading } from "../styles/styles";
import { MainWindow, AccountTerminalWindow, AccountButton, AccountCrossButton } from "./styles/styles";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { IUserObject } from "./types/types";
import { getUserInformation } from "./services/dbServices";
import EmailForm from "./ChangeEmail";
import PasswordForm from "./ChangePassword";
import DeleteForm from "./DeleteAccount";

const stripePromise = loadStripe(
  "pk_test_51KNWhcLDODnvjffbUbztYMavuGapXRvYcp2tLpAtlVXqWsSJ67sApOnTV5lnJRITLwVpBVJ8HHrbfgFhy8I0jUUx00FhK3noVA"
);

const AccountsPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<IUserObject | null>(null);

  const grabUserInfo = async () => {
    try {
      const info = await getUserInformation();
      setUserData(info.data.data);
      setLoggedIn(true);
      console.log(info.data.data);
    } catch (error: any) {
      console.log(error.response);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    grabUserInfo();
  }, []);

  return (
    <>
      <Main theme={theme}>
        {showCheckout ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm theme={theme} closeWindow={setShowCheckout} />
          </Elements>
        ) : null}

        {showEmail ? <EmailForm theme={theme} closeWindow={setShowEmail} /> : null}
        {showPassword ? <PasswordForm theme={theme} closeWindow={setShowPassword} /> : null}
        {showDelete ? <DeleteForm theme={theme} closeWindow={setShowDelete} /> : null}

        <MainWindow theme={theme}>
          <AccountCrossButton onClick={() => navigate("/")}>X</AccountCrossButton>
          {loggedIn ? (
            <>
              <AccountTerminalWindow>
                <SubHeading>Account</SubHeading>
              </AccountTerminalWindow>
              <AccountTerminalWindow>
                <Text>Username: {userData!.username}</Text>
              </AccountTerminalWindow>
              <AccountTerminalWindow>
                <Text>Email: {userData!.email}</Text>
              </AccountTerminalWindow>
              <AccountTerminalWindow>
                <Text>
                  Status:{" "}
                  {userData!.ismember ? "You are a premium member" : "You are a freemium member. Fancy upgrading?"}
                </Text>
              </AccountTerminalWindow>
              <AccountButton onClick={() => setShowCheckout(!showCheckout)}>
                <Text>Upgrade Account?</Text>
              </AccountButton>
              <AccountButton onClick={() => setShowEmail(!showEmail)}>
                <Text>Change email?</Text>
              </AccountButton>
              <AccountButton onClick={() => setShowPassword(!showEmail)}>
                <Text>Change Password?</Text>
              </AccountButton>
              <AccountButton onClick={() => setShowDelete(!showDelete)}>
                <Text>Delete Account?</Text>
              </AccountButton>
            </>
          ) : null}

          {!loggedIn ? (
            <>
              <AccountTerminalWindow>
                <SubHeading>Account</SubHeading>
              </AccountTerminalWindow>
              <AccountTerminalWindow>
                <Text>
                  Please login using the console page to view your information and upgrade to a premium account.
                </Text>
              </AccountTerminalWindow>
            </>
          ) : null}
        </MainWindow>
      </Main>
    </>
  );
};

export default AccountsPage;
