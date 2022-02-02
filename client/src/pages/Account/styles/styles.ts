import styled from "styled-components";
import { theme } from "../../../theme/theme";
import { TerminalBox, TerminalButton } from "../../styles/styles";

export const MainWindow = styled(TerminalBox)`
  width: 100%;
  max-width: 100%;
  height: fit-content;
  margin-top: ${theme.spacing.large};

  display: flex;
  flex-direction: column;

  &:hover {
    transform: rotate(0deg);
  }
`;

export const AccountTerminalWindow = styled(TerminalBox)`
  text-align: left;

  &:hover {
    transform: rotate(0deg);
  }
`;

export const AccountButton = styled(TerminalButton)`
  width: fit-content;
  margin-bottom: ${theme.spacing.xxlarge};
`;

export const AccountCrossButton = styled.p`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: ${theme.font.sizes.large};

  &:hover {
    cursor: pointer;
    transform: scale(108%);
  }
`;
