import styled from "styled-components";
import { theme } from "./theme";

export const MainWindow = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${theme.colors.backgroundColor};
`;

export const TerminalWindow = styled.div`
  background-color: pink;
  width: 85vw;
  height: 80vh;
  position: relative;

  background-color: ${theme.colors.terminalColor};
  border: 5px solid ${theme.colors.borderColor};
  border-radius: 20px;
  box-shadow: 30px 30px 0px ${theme.colors.borderColor};

  display: flex;
  flex-direction: column;

  overflow: wrap;
`;
