import React, { FunctionComponent, useContext } from "react";
import { NavBarContainer, LinksContainer, Links } from "./styles/styles";
import { SubHeading } from "../../styles/styles";
import ThemeContext from "../../../context/theme/themeContext";
import { INavBarProps } from "../../Console/types/types";
import { LinkRoute } from "./styles/styles";

const NavBar: FunctionComponent<INavBarProps> = ({ title }) => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <NavBarContainer theme={theme}>
      <SubHeading>{title}</SubHeading>
      <LinksContainer>
        <LinkRoute to="/" style={{ textDecoration: "none", color: "initial" }}>
          <Links>home</Links>
        </LinkRoute>

        <LinkRoute to="/console" style={{ textDecoration: "none", color: "initial" }}>
          <Links>console</Links>
        </LinkRoute>

        <LinkRoute to="/docs" style={{ textDecoration: "none", color: "initial" }}>
          <Links>docs</Links>
        </LinkRoute>
      </LinksContainer>
    </NavBarContainer>
  );
};

export default NavBar;
