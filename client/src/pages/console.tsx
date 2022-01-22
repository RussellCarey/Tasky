import React, { useState, useRef } from "react";
import { MainWindow, TerminalWindow } from "../components/styles/styled";
import TopBar from "../components/Console/TopBar";
import TextArea from "../components/Console/TextArea";
import InputArea from "../components/Console/InputBox";

import { welcomeText } from "../constants/text";

function ConsolePage() {
  const [userData, setUserData] = useState("");
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

export default ConsolePage;
