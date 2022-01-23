import {
  SET_BACKGROUND_COLOR,
  SET_BORDER_COLOR,
  SET_SHADOW_COLOR,
  SET_TERMINAL_COLOR,
  SET_TEXT_COLOR,
  SET_DARK_THEME,
  SET_LIGHT_THEME,
  IThemeState,
} from "./types";

const Reducer = (state: IThemeState, action: any) => {
  switch (action.type) {
    // Set the new survey title of building survey
    case SET_BACKGROUND_COLOR:
      return { ...state, backgroundColor: action.payload };

    case SET_BORDER_COLOR:
      return { ...state, borderColor: action.payload };

    case SET_SHADOW_COLOR:
      return { ...state, shadowColor: action.payload };

    case SET_TERMINAL_COLOR:
      return { ...state, terminalColor: action.payload };

    case SET_TEXT_COLOR:
      return { ...state, textColor: action.payload };

    case SET_DARK_THEME:
      return action.payload;

    case SET_LIGHT_THEME:
      return action.payload;

    default:
      return state;
  }
};

export default Reducer;
