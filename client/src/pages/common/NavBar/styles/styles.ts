import styled from "styled-components";
import { TerminalBox, Text } from "../../../styles/styles";
import { mixinDefaultTheme } from "../../../../theme/mixins";
import { theme } from "../../../../theme/theme";

export const NavBarContainer = styled(TerminalBox)`
  width: 100%;
  height: min-content;
  padding: ${theme.spacing.large} ${theme.spacing.side};

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    transform: none;
  }
`;

export const LinksContainer = styled.div`
  width: min-content;
  display: flex;
`;

export const Links = styled(Text)`
  margin-left: ${theme.spacing.xxxlage};
`;
