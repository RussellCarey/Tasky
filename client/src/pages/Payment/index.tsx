import { useState, useEffect, FunctionComponent, useContext } from "react";
import ThemeContext from "../../context/theme/themeContext";
import { useSearchParams } from "react-router-dom";
import { Container, MessageWindow } from "./styles/styles";

const Paymentpage: FunctionComponent = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  const [params, setParams] = useSearchParams();
  const [message, setMessage] = useState("Message here");
  const paramString = params.toString().slice(1);

  useEffect(() => {
    console.log(paramString);
  }, []);

  return (
    <Container theme={theme}>
      <MessageWindow theme={theme}>
        <h2>Tasky</h2>
        <p>{message}</p>
        <p>
          Click <a href="/account">here</a> to return to accounts page.
        </p>
      </MessageWindow>
    </Container>
  );
};

export default Paymentpage;
