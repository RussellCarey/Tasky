import { useState, useContext, FunctionComponent, useEffect } from "react";
import Cookie from "js-cookie";
import { getUserInformation } from "./services/dbAccountServices";
import { MainWindow, TerminalWindow } from "./styles/MainWindows";
import CheckoutForm from "./CheckoutForm";
import TopBar from "./TopBar";
import TextArea from "./TextArea";
import InputArea from "./InputBox";
import { welcomeText } from "./constants/text";
import ThemeContext from "../../context/theme/themeContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51KNWhcLDODnvjffbUbztYMavuGapXRvYcp2tLpAtlVXqWsSJ67sApOnTV5lnJRITLwVpBVJ8HHrbfgFhy8I0jUUx00FhK3noVA"
);

const ConsolePage: FunctionComponent = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [consoleText, setConsoleText] = useState<Array<string>>(welcomeText);
  const [inputText, setInputText] = useState<string>("");
  const [showCheckout, setShowCheckout] = useState(false);
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <>
      {showCheckout ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm theme={theme} closeWindow={setShowCheckout} />{" "}
        </Elements>
      ) : null}
      <MainWindow theme={theme}>
        <TerminalWindow theme={theme}>
          <TopBar />
          <TextArea consoleText={consoleText} />
          <InputArea
            inputText={inputText}
            setInputText={setInputText}
            consoleText={consoleText}
            setConsoleText={setConsoleText}
            setShowCheckout={setShowCheckout}
          />
        </TerminalWindow>
      </MainWindow>
    </>
  );
};

export default ConsolePage;
