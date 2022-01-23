import React, { useState, useContext, FunctionComponent } from "react";
import { MainWindow, TerminalWindow } from "../components/styles/styled";
import TopBar from "../components/Console/TopBar";
import TextArea from "../components/Console/TextArea";
import InputArea from "../components/Console/InputBox";
import { welcomeText } from "../constants/text";
import ThemeContext from "../context/theme/themeContext";
interface IConsoleProps {}

const ConsolePage: FunctionComponent<IConsoleProps> = () => {
  const [consoleText, setConsoleText] = useState<Array<string>>(welcomeText);
  const [inputText, setInputText] = useState<string>("");

  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <MainWindow theme={theme}>
      <TerminalWindow theme={theme}>
        <TopBar />
        <TextArea consoleText={consoleText} />
        <InputArea
          inputText={inputText}
          setInputText={setInputText}
          consoleText={consoleText}
          setConsoleText={setConsoleText}
        />
      </TerminalWindow>
    </MainWindow>
  );
};

export default ConsolePage;
