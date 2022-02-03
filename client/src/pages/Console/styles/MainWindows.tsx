import styled from "styled-components";
import { theme } from "../../../theme/theme";
import { mixinDefaultTheme } from "../../../theme/mixins";

export const MainWindow = styled.div`
  width: 100vw;
  height: 100vh;
  padding: ${theme.spacing.xxxlage};

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${(props) => props.theme.backgroundColor};
`;

export const TerminalWindow = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  ${mixinDefaultTheme};

  border-radius: 20px;

  display: flex;
  flex-direction: column;

  overflow: wrap;

  @media (max-width: 900px) {
    width: 95vw;
    height: 95vh;
    box-shadow: 10px 10px 0px ${(props) => props.theme.shadowColor};
  }

  @media (max-width: 500px) {
    width: 99vw;
    height: calc(99vh - calc(100vh - 100%));
    box-shadow: 0px 0px 0px ${(props) => props.theme.shadowColor};
  }
`;
