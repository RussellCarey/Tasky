import styled from "styled-components";
import { theme } from "../../styles/theme";

export const TextAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${theme.spacing.medium};

  display: flex;
  flex-direction: column;
  word-wrap: break-word;

  overflow-y: scroll;
  overflow-x: hidden;

  /* width */
  &::-webkit-scrollbar {
    width: 40px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: ${theme.colors.borderColor};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.terminalColor};
    border-left: solid 5px ${theme.colors.borderColor};
    border-right: solid 5px ${theme.colors.borderColor};
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const Text = styled.p`
  line-height: ${theme.spacing.large};
  margin-bottom: ${theme.spacing.xsmall};
`;
