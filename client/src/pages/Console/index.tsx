import React, { useState, useContext, FunctionComponent } from "react";
import { MainWindow, TerminalWindow } from "./styles/MainWindows";
import TopBar from "./TopBar";
import TextArea from "./TextArea";
import InputArea from "./InputBox";
import { welcomeText } from "../../constants/text";
import ThemeContext from "../../context/theme/themeContext";

const ConsolePage: FunctionComponent = () => {
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
