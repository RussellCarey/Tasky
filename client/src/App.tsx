import React, { useState, useRef } from "react";
import { MainWindow, TerminalWindow } from "./components/styles/styled";
import TopBar from "./components/Window/TopBar";
import TextArea from "./components/Window/TextArea";
import InputArea from "./components/Window/InputBox";

import { welcomeText } from "./constants/text";

function App() {
  const [consoleText, setConsoleText] = useState<Array<string>>(welcomeText);
  const [inputText, setInputText] = useState<string>("");

  return (
    <MainWindow>
      <TerminalWindow>
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
}

export default App;
