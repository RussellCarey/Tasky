import styled from "styled-components";
import { Main, TerminalButton } from "../../styles/styles";
import { ButtonContainer } from "../../Home/sections/Title/Title.styles";
import { TerminalBox } from "../../styles/styles";

export const ContactMain = styled(Main)`
  display: flex;
  align-items: center;
  justify-content: center;
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
`;
