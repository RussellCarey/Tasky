import React, { FunctionComponent, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

import { IPropsInputArea } from "../types/types";

import { checkMatch } from "../../services/textAreaServies";
import { login, logout, clearWindowText } from "../../services/commandService";

const InputContainer = styled.input`
  width: 100%;
  height: 70px;
  padding: ${theme.spacing.medium};

  border: none;
  outline: none;
  border-top: 5px solid ${theme.colors.borderColor};
  border-radius: 0 0 20px 20px;
  background-color: ${theme.colors.terminalColor};

  font-size: ${theme.spacing.medium};
`;

const InputArea: FunctionComponent<IPropsInputArea> = ({ inputText, setInputText, consoleText, setConsoleText }) => {
  const inputElement = useRef<HTMLInputElement | null>(null);
  const [canPress, setCanPress] = useState<Boolean>(true);

  const textOnChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setInputText(target.value);
  };

  const resetPress = () => {
    setInputText("");
    setCanPress(true);
  };

  const addConsoleText = (textArray: Array<string>) => {
    setConsoleText([...consoleText, ...textArray]);
  };

  const onEnterPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canPress) {
      try {
        setCanPress(false);

        // Return an object with a name and a function if command matches AND the arguments left over from the input.
        const checkForCommand = await checkMatch(inputText);

        switch (checkForCommand.command.name) {
          case "error":
            addConsoleText(["Command not recognised.."]);
            break;

          case "login":
            addConsoleText(["Attempting login, please wait..."]);
            const loginAttempt = await login(checkForCommand.args);
            addConsoleText([...loginAttempt]);
            break;

          case "logout":
            addConsoleText(["Attempting login, please wait..."]);
            const logoutAttempt = await logout(checkForCommand.args);
            addConsoleText([...logoutAttempt]);
            break;

          case "clear":
            setConsoleText("");
            break;
        }

        resetPress();
      } catch (error) {
        resetPress();
      }
    }
  };

  useEffect(() => {
    if (inputElement && inputElement.current) inputElement.current.focus();
  }, []);

  return (
    <InputContainer
      ref={inputElement}
      type="text"
      value={inputText}
      placeholder="Enter command.."
      onChange={textOnChange}
      onKeyPress={onEnterPress}
    />
  );
};

export default InputArea;
