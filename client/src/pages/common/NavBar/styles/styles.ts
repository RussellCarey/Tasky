import styled from "styled-components";
import { TerminalBox, Text } from "../../../styles/styles";
import { Link } from "react-router-dom";
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

  /* // Dont show the nav bar on smaller devices. Its not needed.
  @media (max-width: 600px) {
    display: none;
  } */
`;

export const LinksContainer = styled.div`
  width: min-content;
  display: flex;
`;

export const Links = styled(Text)`
  margin-left: ${theme.spacing.xxxlage};
`;

export const LinkRoute = styled(Link)`
  &:hover {
    transform: scale(105%);
  }
`;
