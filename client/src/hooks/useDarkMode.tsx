import React, { useEffect, useState } from "react";

// NOT USED FOR NOW / UNFINISHED / MAY USE LATER
// NOT USED FOR NOW / UNFINISHED / MAY USE LATER
export default function useDarkMode() {
  interface IPropsTheme {
    backgroundColor: string;
    borderColor: string;
    terminalColor: string;
    textColor: string;
  }

  const lightTheme = {
    backgroundColor: "#F9C335",
    borderColor: "#F0EADB",
    terminalColor: "#30302C",
    textColor: "#1C1C1C",
  };

  const darkTheme = {
    backgroundColor: "#414141",
    borderColor: "#CCCCCC",
    terminalColor: "#383737",
    textColor: "#E2E2E2",
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<IPropsTheme>(lightTheme);

  useEffect(() => {
    isDarkMode ? setTheme(darkTheme) : setTheme(lightTheme);
  }, [isDarkMode]);

  return { theme, setIsDarkMode };
}
