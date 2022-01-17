import styled from "styled-components";
import { theme } from "../styles/theme";

const TopBarContainer = styled.div`
  width: 100%;
  height: 80px;
  padding: ${theme.spacing.medium};

  border-bottom: 5px solid ${theme.colors.borderColor};

  display: flex;
  align-items: center;
`;

const Title = styled.h5`
  font-size: ${theme.font.sizes.large};
  font-weight: bold;
`;

export default function TopBar() {
  return (
    <TopBarContainer>
      <Title>Tasky</Title>
    </TopBarContainer>
  );
}
