import React, { FunctionComponent, useContext } from "react";
import { NavBarContainer, LinksContainer, Links } from "./styles/styles";
import { SubHeading } from "../../styles/styles";
import ThemeContext from "../../../context/theme/themeContext";
import { INavBarProps } from "../../Console/types/types";

const NavBar: FunctionComponent<INavBarProps> = ({ title }) => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <NavBarContainer theme={theme}>
      <SubHeading>{title}</SubHeading>
      <LinksContainer>
        <Links>console</Links>
        <Links>docs</Links>
        <Links>contact</Links>
      </LinksContainer>
    </NavBarContainer>
  );
};

export default NavBar;
