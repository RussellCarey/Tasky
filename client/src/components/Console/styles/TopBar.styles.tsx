import styled from "styled-components";
import { theme } from "../../styles/theme";

export const TopBarContainer = styled.div`
  width: 100%;
  height: 80px;
  padding: ${theme.spacing.medium};

  border-bottom: 5px solid ${(props) => props.theme.borderColor};

  color: ${(props) => props.theme.textColor};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h5`
  font-size: ${theme.font.sizes.large};
  font-weight: bold;
`;
