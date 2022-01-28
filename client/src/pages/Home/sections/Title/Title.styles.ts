import { theme } from "../../../../theme/theme";
import styled from "styled-components";

export const TitleSectionDiv = styled.div`
  position: relative;
  height: 100vh;

  padding: 0 ${theme.spacing.xxxlage};

  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;

  @media (max-width: 560px) {
    align-items: center;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: min-content;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  @media (max-width: 560px) {
    flex-wrap: none;
    justify-content: center;
    align-items: center;
  }
`;
