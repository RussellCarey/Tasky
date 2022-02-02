import { useState, useEffect, FunctionComponent, useContext } from "react";
import ThemeContext from "../../context/theme/themeContext";
import { useSearchParams } from "react-router-dom";
import { Container, MessageWindow } from "./styles/styles";

const Paymentpage: FunctionComponent = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  const [success, setSuccess] = useState(false);
  const [params, setParams] = useSearchParams();
  const paramString = params.toString().slice(1);

  useEffect(() => {
    if (paramString === "success") setSuccess(true);
  }, []);

  return (
    <Container theme={theme}>
      <MessageWindow theme={theme}>
        <h2>Tasky</h2>
        {success ? (
          <p>
            Good news! Your payment was a success. Just like you. Please check your email for confirmation and contact
            us if you need anything!
          </p>
        ) : (
          <p>
            Something went wrong with your payment or upgrading your account. You may have been charged. Please contact
            us to resolve any issues you may have.
          </p>
        )}
      </MessageWindow>
    </Container>
  );
};

export default Paymentpage;
