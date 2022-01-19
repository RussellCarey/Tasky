import React, { FunctionComponent, useRef, useEffect, useState } from "react";
import { InputContainer } from "./styles/InputBox.styles";

import { IPropsInputArea } from "../types/types";

import { checkMatch } from "../../services/textAreaServies";
import { ECommandReturnOptions } from "../../types/commandReturnEnums";
import { login, logout, signup, addNewTaskName, getAllTaskNames, addNewTask } from "../../services/commandService";
import { aboutText, helpScreenText } from "../../constants/text";

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

        // Check if matching commands exists in the string and return that, with its arguments..
        const checkForCommand = await checkMatch(inputText);

        switch (checkForCommand.command.name) {
          case ECommandReturnOptions.error:
            addConsoleText(["Command not recognised.."]);
            break;

          case ECommandReturnOptions.about:
            addConsoleText([...aboutText]);
            break;

          case ECommandReturnOptions.showhelp:
            addConsoleText([...helpScreenText]);
            break;

          case ECommandReturnOptions.login:
            addConsoleText(["Attempting login, please wait..."]);
            const loginAttempt = await login(checkForCommand.args);
            addConsoleText([...loginAttempt]);
            break;

          case ECommandReturnOptions.logout:
            addConsoleText(["Attempting login, please wait..."]);
            const logoutAttempt = await logout(checkForCommand.args);
            addConsoleText([...logoutAttempt]);
            break;

          case ECommandReturnOptions.signup:
            addConsoleText(["Attempting sign up."]);
            const signupAttempt = await signup(checkForCommand.args);
            addConsoleText([...signupAttempt]);
            break;

          case ECommandReturnOptions.addnewtaskname:
            addConsoleText(["Attempting to add your new task!"]);
            const addTaskAttempt = await addNewTaskName(checkForCommand.args);
            addConsoleText([...addTaskAttempt]);
            break;

          case ECommandReturnOptions.showtasknames:
            addConsoleText(["Searching for your tasks, please wait.."]);
            const tasks = await getAllTaskNames();
            addConsoleText([...tasks]);
            break;

          case ECommandReturnOptions.addnewtask:
            addConsoleText(["Attempting to add new task.."]);
            const newTask = await addNewTask(checkForCommand.args);
            addConsoleText([...newTask]);
            break;

          case ECommandReturnOptions.clear:
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
