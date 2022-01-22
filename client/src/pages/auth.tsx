import React, { useState, useEffect, FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../components/styles/theme";
import { useSearchParams } from "react-router-dom";
import { authenticateUser } from "../services/dbServices";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${theme.colors.backgroundColor};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageWindow = styled.div`
  background-color: pink;
  width: 70vw;
  height: max-content;
  padding: ${theme.spacing.xlarge} ${theme.spacing.xlarge};
  position: relative;

  background-color: ${theme.colors.terminalColor};
  border: 5px solid ${theme.colors.borderColor};
  border-radius: 20px;
  box-shadow: 20px 20px 0px ${theme.colors.borderColor};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: wrap;

  text-align: center;
`;

interface IAuthProps {
  theme: React.Dispatch<Object>;
}

const AuthPage: FunctionComponent<IAuthProps> = ({ theme }) => {
  const [params, setParams] = useSearchParams();
  const [message, setMessage] = useState("Error. You are already activated or there is an error with the auth key.");

  const paramString = params.toString().slice(1);

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
        <h2>Tasky</h2>
        <p>{message}</p>
        <p>
          Click <a href="/">here</a> to return to homepage
        </p>
      </MessageWindow>
    </Container>
  );
};

export default AuthPage;
