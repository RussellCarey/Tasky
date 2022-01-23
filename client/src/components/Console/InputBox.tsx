import React, { FunctionComponent, useRef, useEffect, useState, useContext } from "react";
import { InputContainer } from "./styles/InputBox.styles";
import { IPropsInputArea } from "../types/types";
import { checkMatch } from "../../services/textAreaServies";
import { ECommandReturnOptions } from "../../types/commandReturnEnums";
import {
  login,
  logout,
  signup,
  addNewTaskName,
  getAllTaskNames,
  addNewTask,
  deleteTaskNames,
  deleteTask,
  showTasksOnDate,
  // showTasksForToday,
  showTasksDateRange,
  deleteTasksOnDate,
  deleteTasksFromRange,
} from "../../services/commandService";
import { aboutText, helpScreenText } from "../../constants/text";
import ThemeContext from "../../context/theme/themeContext";

const InputArea: FunctionComponent<IPropsInputArea> = ({ inputText, setInputText, consoleText, setConsoleText }) => {
  const themeContext = useContext(ThemeContext);
  const {
    theme,
    setBackgroundColor,
    setDarkTheme,
    setLightTheme,
    setBorderColor,
    setTerminalColor,
    setShadowColor,
    setTextColor,
  } = themeContext;

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

          case ECommandReturnOptions.addNewTaskName:
            addConsoleText(["Attempting to add your new task name!"]);
            const addTaskAttempt = await addNewTaskName(checkForCommand.args);
            addConsoleText([...addTaskAttempt]);
            break;

          case ECommandReturnOptions.showTaskNames:
            addConsoleText(["Attempting to find for your task names, please wait.."]);
            const tasks = await getAllTaskNames();
            addConsoleText([...tasks]);
            break;

          case ECommandReturnOptions.addNewTask:
            addConsoleText(["Attempting to add new task.."]);
            const newTask = await addNewTask(checkForCommand.args);
            addConsoleText([...newTask]);
            break;

          case ECommandReturnOptions.deleteTaskNames:
            addConsoleText(["Attempting to delete task name.."]);
            const deleteTaskName = await deleteTaskNames(checkForCommand.args);
            addConsoleText([...deleteTaskName]);
            break;

          // Delete ONE task instances
          case ECommandReturnOptions.deleteTasks:
            addConsoleText(["Attempting to delete task.."]);
            const deleteTaskWithHours = await deleteTask(checkForCommand.args);
            addConsoleText([...deleteTaskWithHours]);
            break;

          case ECommandReturnOptions.showTasksFrom:
            addConsoleText(["Attempting to get date range tasks.."]);
            const datesTasks = await showTasksDateRange(checkForCommand.args);
            addConsoleText([...datesTasks]);
            break;

          case ECommandReturnOptions.showTasksFor:
            addConsoleText(["Attempting to get tasks.."]);
            const getDaysTasks = await showTasksOnDate(checkForCommand.args);
            addConsoleText([...getDaysTasks]);
            break;

          case ECommandReturnOptions.showTasks:
            addConsoleText(["Attempting to get tasks.."]);
            const todaysTasks = await showTasksOnDate(checkForCommand.args);
            addConsoleText([...todaysTasks]);
            break;

          case ECommandReturnOptions.deleteTasksFrom:
            addConsoleText(["Attempting to get tasks.."]);
            const deleteRange = await deleteTasksFromRange(checkForCommand.args);
            addConsoleText([...deleteRange]);
            break;

          case ECommandReturnOptions.deleteTasks:
            addConsoleText(["Attempting to get tasks.."]);
            const deleteTasks = await deleteTasksOnDate(checkForCommand.args);
            addConsoleText([...deleteTasks]);
            break;

          case ECommandReturnOptions.setBackgroundColor:
            console.log(checkForCommand.args[0]);
            setBackgroundColor(checkForCommand.args[0]);
            addConsoleText([`Set background color to ${checkForCommand.args[0]}`]);
            break;

          case ECommandReturnOptions.setBorderColor:
            console.log(checkForCommand.args[0]);
            setBorderColor(checkForCommand.args[0]);
            addConsoleText([`Set background color to ${checkForCommand.args[0]}`]);
            break;

          case ECommandReturnOptions.setTextColor:
            console.log(checkForCommand.args[0]);
            setTextColor(checkForCommand.args[0]);
            addConsoleText([`Set background color to ${checkForCommand.args[0]}`]);
            break;

          case ECommandReturnOptions.setTerminalColor:
            console.log(checkForCommand.args[0]);
            setTerminalColor(checkForCommand.args[0]);
            addConsoleText([`Set background color to ${checkForCommand.args[0]}`]);
            break;

          case ECommandReturnOptions.setShadowColor:
            console.log(checkForCommand.args[0]);
            setShadowColor(checkForCommand.args[0]);
            addConsoleText([`Set background color to ${checkForCommand.args[0]}`]);
            break;

          case ECommandReturnOptions.setThemeLight:
            console.log(checkForCommand.args[0]);
            setLightTheme();
            addConsoleText([`Set background color to default light mode.`]);
            break;

          case ECommandReturnOptions.setThemeDark:
            console.log(checkForCommand.args[0]);
            setDarkTheme();
            addConsoleText([`Set background color to dark mode`]);
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
      theme={theme}
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
