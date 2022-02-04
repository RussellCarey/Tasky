import styled from "styled-components";
import { theme } from "../../../theme/theme";
import { Container, TerminalButton } from "../../styles/styles";
import { ButtonContainer } from "../../Home/sections/Title/Title.styles";
import { TerminalBox } from "../../styles/styles";

export const ContactMain = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: ${theme.spacing.xxxlage};
`;

export const ContactContainer = styled(ButtonContainer)`
  display: flex;
  flex-direction: row;
`;

export const ContactHeading = styled(TerminalBox)`
  width: max-content;
`;

export const ContactButton = styled(TerminalButton)`
  margin-right: 0;
  margin-bottom: ${theme.spacing.xlarge};
`;
