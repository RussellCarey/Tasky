import { css } from "styled-components";

// Main points of the theme for each terminal window or button etc..
export const mixinDefaultTheme = css`
  background-color: ${(props) => props.theme.terminalColor};
  box-shadow: 20px 20px 0px ${(props) => props.theme.shadowColor};
  border: solid 5px ${(props) => props.theme.borderColor};
  border-radius: 15px;
  color: ${(props) => props.theme.textColor};
`;
