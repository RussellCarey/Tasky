export const SET_BACKGROUND_COLOR = "SET_BACKGROUND_COLOR";
export const SET_BORDER_COLOR = "SET_BORDER_COLOR";
export const SET_TERMINAL_COLOR = "SET_TERMINAL_COLOR";
export const SET_TEXT_COLOR = "SET_TEXT_COLOR";
export const SET_SHADOW_COLOR = "SET_SHADOW_COLOR";
export const SET_LIGHT_THEME = "SET_LIGHT_THEME";
export const SET_DARK_THEME = "SET_DARK_THEME";

export interface IPropsState {
  children: React.ReactNode;
}

export interface IThemeState {
  backgroundColor: string;
  terminalColor: string;
  borderColor: string;
  shadowColor: string;
  textColor: string;
}
