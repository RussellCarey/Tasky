import { useState, useEffect, FunctionComponent, useContext } from "react";
import ThemeContext from "../../context/theme/themeContext";
import { useSearchParams } from "react-router-dom";
import { Container, MessageWindow, Title } from "./styles/styles";
import { Text } from "../styles/styles";
import NavBar from "../common/NavBar";

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
      <NavBar title={"Payment"} />
      <MessageWindow theme={theme}>
        <Title>Tasky</Title>
        {success ? (
          <>
            <Text>
              Good news! Your payment was a success. Just like you. Please check your email for confirmation and contact
              us if you need anything!
            </Text>
            <Text>
              Click <a href="/">here</a> to return to homepage
            </Text>
          </>
        ) : (
          <>
            <Text>
              Something went wrong with your payment or upgrading your account. You may have been charged. Please
              contact us to resolve any issues you may have.
            </Text>
            <Text>
              Click <a href="/">here</a> to return to homepage
            </Text>
          </>
        )}
      </MessageWindow>
    </Container>
  );
};

export default Paymentpage;
