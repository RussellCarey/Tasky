import { theme } from "../../../theme/theme";
import styled from "styled-components";

export const TitleSectionDiv = styled.div`
  position: relative;
  height: 100vh;

  padding: 0 ${theme.spacing.xxxlage};

  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  width: max-content;
  height: min-content;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
