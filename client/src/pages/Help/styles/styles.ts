import styled from "styled-components";
import { theme } from "../../../theme/theme";
import { Container, Text } from "../../styles/styles";
import { TerminalBox } from "../../styles/styles";

export const HelpMain = styled(Container)`
  padding: ${theme.spacing.xxxlage};

  @media (max-width: 500px) {
    padding: ${theme.spacing.large};
  }
`;

export const HelpWindow = styled(TerminalBox)`
  margin-left: 0;
  padding: ${theme.spacing.xxlarge};

  &:hover {
    transform: rotate(0deg);
  }

  @media (max-width: 800px) {
    text-align: center;
  }
`;

export const InfoText = styled(Text)`
  margin-bottom: ${theme.spacing.large};

  @media (max-width: 600px) {
    line-height: ${theme.font.sizes.large};
  }
`;
