import React, { useState, useEffect, FunctionComponent, useContext } from "react";
import ThemeContext from "../../context/theme/themeContext";
import { useSearchParams } from "react-router-dom";
import { authenticateUser } from "./services/dbServices";
import { Container, MessageWindow, Title } from "./styles/styles";
import { Text } from "../styles/styles";

const AuthPage: FunctionComponent = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  const [params, setParams] = useSearchParams();
  const [message, setMessage] = useState("Error. You are already activated or there is an error with the auth key.");

  const paramString = params.toString().slice(1);

  //!
  const attemptAuthUsingParam = async (param: string) => {
    try {
      await authenticateUser(param);
      setMessage("Account activiated, enjoy Tasky!");
    } catch (error: any) {
      console.log(error.response);
      setMessage(`Error ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    attemptAuthUsingParam(paramString);
  }, []);

  return (
    <Container theme={theme}>
      <MessageWindow theme={theme}>
        <Title>Tasky</Title>
        <Text>{message}</Text>
        <Text>
          Click <a href="/">here</a> to return to homepage
        </Text>
      </MessageWindow>
    </Container>
  );
};

export default AuthPage;
