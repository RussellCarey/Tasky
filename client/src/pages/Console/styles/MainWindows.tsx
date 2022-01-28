import styled from "styled-components";
import { mixinDefaultTheme } from "../../../theme/mixins";

export const MainWindow = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.backgroundColor};
`;

export const TerminalWindow = styled.div`
  width: 85vw;
  height: 80vh;
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
    height: 99vh;
    box-shadow: 0px 0px 0px ${(props) => props.theme.shadowColor};
  }
`;
