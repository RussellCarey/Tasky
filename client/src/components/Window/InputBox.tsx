import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

import { IPropsInputArea } from "../types/types";

import { checkMatch } from "../../services/textAreaServies";

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
  // On re-render, make sure the text is in vie from top to bottom.

  const textOnChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setInputText(target.value);
  };

  const onEnterPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Return an object with a name and a function if command matches AND the arguments left over from the input.
      const checkForCommand = await checkMatch(inputText);

      const commandFunction = checkForCommand?.command.output(checkForCommand.args)!;

      await setConsoleText([...consoleText, ...commandFunction]);
      await setInputText("");
    }
  };

  return (
    <InputContainer
      type="text"
      value={inputText}
      placeholder="Enter command.. :)"
      onChange={textOnChange}
      onKeyPress={onEnterPress}
    />
  );
};

export default InputArea;
