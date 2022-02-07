import { useReducer, useEffect } from "react";
import ThemeReducer from "./themeReducer";
import ThemeContext from "./themeContext";
import { ICommandObject } from "./types";
import {
  SET_BACKGROUND_COLOR,
  SET_BORDER_COLOR,
  SET_SHADOW_COLOR,
  SET_TERMINAL_COLOR,
  SET_TEXT_COLOR,
  SET_DARK_THEME,
  SET_LIGHT_THEME,
  IPropsState,
} from "./types";

const ThemeState = (props: IPropsState) => {
  const lightThemeDefault = {
    backgroundColor: "#F9C335",
    terminalColor: "#F0EADB",
    borderColor: "#30302C",
    textColor: "#1C1C1C",
    shadowColor: "#30302C",
  };

  const darkThemeDefault = {
    backgroundColor: "#414141",
    terminalColor: "#383737",
    borderColor: "#CCCCCC",
    textColor: "#E2E2E2",
    shadowColor: "#2E2E2D",
  };

  const savedTheme = localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")!) : null;
  const defaultState = savedTheme || lightThemeDefault;

  const [theme, dispatch] = useReducer(ThemeReducer, defaultState);

  const setBackgroundColor = (commandObj: ICommandObject) => {
    const color = commandObj.args[0];
    dispatch({ type: SET_BACKGROUND_COLOR, payload: color });
    localStorage.setItem("theme", JSON.stringify({ ...theme, backgroundColor: color }));
    return ["Changed background color."];
  };

  const setBorderColor = (commandObj: ICommandObject) => {
    const color = commandObj.args[0];
    dispatch({ type: SET_BORDER_COLOR, payload: color });
    localStorage.setItem("theme", JSON.stringify({ ...theme, borderColor: color }));
    return ["Changed border color."];
  };

  const setTerminalColor = (commandObj: ICommandObject) => {
    const color = commandObj.args[0];
    dispatch({ type: SET_TERMINAL_COLOR, payload: color });
    localStorage.setItem("theme", JSON.stringify({ ...theme, terminalColor: color }));
    return ["Changed terminal color."];
  };

  const setShadowColor = (commandObj: ICommandObject) => {
    const color = commandObj.args[0];
    dispatch({ type: SET_SHADOW_COLOR, payload: color });
    localStorage.setItem("theme", JSON.stringify({ ...theme, shadowColor: color }));
    return ["Changed shadow color."];
  };

  const setTextColor = (commandObj: ICommandObject) => {
    const color = commandObj.args[0];
    dispatch({ type: SET_TEXT_COLOR, payload: color });
    localStorage.setItem("theme", JSON.stringify({ ...theme, textColor: color }));
    return ["Changed text color."];
  };

  const setLightTheme = () => {
    dispatch({ type: SET_LIGHT_THEME, payload: lightThemeDefault });
    localStorage.setItem("theme", JSON.stringify({ ...theme, ...lightThemeDefault }));
    return ["Changed theme to light."];
  };

  const setDarkTheme = () => {
    dispatch({ type: SET_DARK_THEME, payload: darkThemeDefault });
    localStorage.setItem("theme", JSON.stringify({ ...theme, ...darkThemeDefault }));
    return ["Changed theme to dark."];
  };

  const uiCommandMap = {
    set_background_color: setBackgroundColor,
    set_border_color: setBorderColor,
    set_shadow_color: setShadowColor,
    set_terminal_color: setTerminalColor,
    set_text_color: setTextColor,
    set_theme_light: setLightTheme,
    set_theme_dark: setDarkTheme,
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        uiCommandMap,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
