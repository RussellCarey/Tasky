import { theme } from "../../../theme/theme";
import styled from "styled-components";
import { mixinDefaultTheme } from "../../../theme/mixins";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${(props) => props.theme.backgroundColor};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MessageWindow = styled.div`
  width: 70vw;
  height: max-content;
  padding: ${theme.spacing.xlarge} ${theme.spacing.xlarge};
  position: relative;

  background-color: ${(props) => props.theme.terminalColor};
  border: 5px solid ${(props) => props.theme.borderColor};
  border-radius: 20px;
  box-shadow: 20px 20px 0px ${(props) => props.theme.shadowColor};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: wrap;

  text-align: center;
`;
