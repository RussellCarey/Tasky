import styled from "styled-components";
import { theme } from "../../../theme/theme";

export const InputContainer = styled.input`
  width: 100%;
  height: 70px;
  padding: ${theme.spacing.medium};

  border: none;
  outline: none;
  border-top: 5px solid ${(props) => props.theme.borderColor};
  border-radius: 0 0 20px 20px;
  background-color: ${(props) => props.theme.terminalColor};
  font-size: ${theme.spacing.medium};

  color: ${(props) => props.theme.textColor};
`;
