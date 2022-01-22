import styled from "styled-components";
import { theme } from "../../styles/theme";

export const InputContainer = styled.input`
  width: 100%;
  height: 70px;
  padding: ${theme.spacing.medium};

  border: none;
  outline: none;
  border-top: 5px solid ${theme.colors.borderColor};
  border-radius: 0 0 20px 20px;
  background-color: ${theme.colors.terminalColor};

  font-size: ${theme.spacing.medium};
`;
