import { theme } from "../../theme/theme";
import styled from "styled-components";
import { mixinDefaultTheme } from "../../theme/mixins";

// Main window container for pages
export const Container = styled.div`
  position: relative;
  min-height: 100vh;

  overflow-y: scroll;

  background-color: ${(props) => props.theme.backgroundColor};
`;

// Terminal Styled Div
export const TerminalBox = styled.div`
  width: fit-content;
  height: max-content;
  ${mixinDefaultTheme};

  padding: ${theme.spacing.medium};
  word-wrap: break-word;
  margin-bottom: ${theme.spacing.xxxlage};

  transition: all 0.5s ease;

  &:hover {
    transform: rotate(1deg);
  }

  @media (max-width: 600px) {
    box-shadow: 10px 10px 0px ${(props) => props.theme.shadowColor};
  }
`;

// Termainl styled button
export const TerminalButton = styled.div`
  width: min-content;
  height: max-content;
  ${mixinDefaultTheme};

  padding: ${theme.spacing.medium};

  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    filter: brightness(85%);
    transform: scale(102%) rotate(-1deg);
  }

  @media (max-width: 600px) {
    box-shadow: 10px 10px 0px ${(props) => props.theme.shadowColor};
  }
`;

// Large text for main title
export const MainHeading = styled.p`
  font-size: ${theme.font.sizes.title};

  @media (max-width: 600px) {
    font-size: ${theme.font.sizes.xxxlage};
  }

  @media (max-width: 400px) {
    font-size: ${theme.font.sizes.xxlarge};
  }
`;

// Sub heading text (smaller than button text)
export const SubHeading = styled.h2`
  font-size: ${theme.font.sizes.xxlarge};

  @media (max-width: 600px) {
    font-size: ${theme.font.sizes.large};
    text-align: center;
  }
`;

// Button text for large buttons
export const ButtonTextLarge = styled.h3`
  font-size: ${theme.font.sizes.xxxlage};

  @media (max-width: 600px) {
    font-size: ${theme.font.sizes.large};
  }
`;

// General Text
export const Text = styled.p`
  line-height: ${theme.spacing.xxlarge};
  font-size: ${theme.font.sizes.large};

  @media (max-width: 600px) {
    font-size: ${theme.font.sizes.medium};
  }
`;
