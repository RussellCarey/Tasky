import styled from "styled-components";
import { theme } from "../../../theme/theme";
import { TerminalBox, TerminalButton } from "../../styles/styles";

export const MainWindow = styled(TerminalBox)`
  width: 100%;
  max-width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;

  &:hover {
    transform: rotate(0deg);
  }
`;

export const AccountTerminalWindow = styled(TerminalBox)`
  text-align: center;

  &:hover {
    transform: rotate(0deg);
  }
`;

export const AccountButton = styled(TerminalButton)`
  width: fit-content;
  margin-bottom: ${theme.spacing.xxlarge};
`;
