import React, { FunctionComponent, useRef, useEffect, useState, useContext } from "react";
import { InputContainer } from "./styles/InputBox.styles";
import { IPropsInputArea } from "./types/types";
import { checkStarting } from "./utils/checkMatchingCommand";
import ThemeContext from "../../context/theme/themeContext";
import { hideLoginPassword } from "./utils/hideLoginPassword";
import { commandMap } from "./commands/commandMap";
import Cookies from "js-cookie";

const InputArea: FunctionComponent<IPropsInputArea> = ({
  inputText,
  setInputText,
  consoleText,
  setConsoleText,
  setShowCheckout,
}) => {
  const themeContext = useContext(ThemeContext);
  const { theme, uiCommandMap } = themeContext;

  const passwordRef = useRef<string>("");
  const inputElement = useRef<HTMLInputElement | null>(null);
  const [canPress, setCanPress] = useState<Boolean>(true);

  const textOnChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const capitalize = target.value.slice(0, 1).toLowerCase();
    const targetText = capitalize + target.value.slice(1);

    // WHen using the login command, this will hide the password with ***s
    const stringText = hideLoginPassword(targetText, passwordRef);

    setInputText(stringText);
  };

  // DOnt want user being able to type why a network request etc is happening..
  const resetPress = () => {
    setInputText("");
    setCanPress(true);
  };

  const addConsoleText = (textArray: Array<string>) => {
    setConsoleText([...consoleText, ...textArray]);
  };

  // On pressing enter after writing a command..
  const onEnterPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canPress) {
      try {
        setCanPress(false);
        addConsoleText(["Please wait, running task."]);

        // Check if matching commands exists in the string and return that, with its arguments..
        // Convert spaces to _ as the commands in the object are named using _ as spaces.
        // Combine context map with command map.
        const combinedMaps = { ...commandMap, ...uiCommandMap };
        const checkForCommand = checkStarting(inputText, combinedMaps);
        checkForCommand.passwordRef = passwordRef.current;

        // Check for clear first
        if (checkForCommand.commandName === "clear") {
          resetPress();
          return setConsoleText("");
        }

        // Check for clear first
        if (checkForCommand.commandName === "upgrade_account") {
          if (Cookies.get("jwt")) {
            setShowCheckout(true);
            resetPress();
            return addConsoleText(["Opening purchase window."]);
          }
          return addConsoleText(["Please log into to upgrade account."]);
        }

        // Check merged theme and commands hashmaps for matching command.
        const runCommand = await checkForCommand.commandFunc(checkForCommand);
        addConsoleText([...runCommand]);

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
