import { theme } from "../../../../theme/theme";
import styled from "styled-components";
import { Container, TerminalButton } from "../../../styles/styles";

export const TitleContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing.side};

  @media (max-width: 600px) {
    align-items: center;
  }
`;

//! Change to responseive grid?? Then can easily do grid gap etc..
export const ButtonContainer = styled.div`
  width: 100%;
  height: min-content;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

export const TitleButton = styled(TerminalButton)`
  margin-right: ${theme.spacing.large};

  @media (max-width: 600px) {
    margin-bottom: ${theme.spacing.large};
  }
`;
