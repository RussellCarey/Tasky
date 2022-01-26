import { theme } from "../../../theme/theme";
import styled from "styled-components";

export const Main = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.backgroundColor};
`;

export const TerminalBox = styled.div`
  width: max-content;
  height: max-content;

  padding: ${theme.spacing.medium};

  background-color: ${(props) => props.theme.terminalColor};
  box-shadow: 20px 20px 0px ${(props) => props.theme.shadowColor};

  border: solid 5px ${(props) => props.theme.borderColor};
  border-radius: 15px;

  color: ${(props) => props.theme.textColor};

  margin-bottom: ${theme.spacing.xxxlage};

  transition: all 0.5s ease;

  &:hover {
    transform: rotate(1deg);
  }
`;

export const TerminalButton = styled.div`
  width: max-content;
  height: max-content;

  padding: ${theme.spacing.medium};

  background-color: ${(props) => props.theme.terminalColor};
  box-shadow: 20px 20px 0px ${(props) => props.theme.shadowColor};

  border: solid 5px ${(props) => props.theme.borderColor};
  border-radius: 15px;

  color: ${(props) => props.theme.textColor};

  margin-right: ${theme.spacing.xxlarge};

  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    filter: brightness(85%);
    transform: scale(102%) rotate(-1deg);
  }
`;

export const MainHeading = styled.p`
  font-size: ${theme.font.sizes.title};
`;

export const SubHeading = styled.h2`
  font-size: ${theme.font.sizes.xxlarge};
`;
export const SmallHeading = styled.h3`
  font-size: ${theme.font.sizes.xxxlage};
`;
