import { FunctionComponent, useContext } from "react";
import { MainHeading, TerminalBox, TerminalButton, ButtonTextLarge, Main } from "../styles/styles";
import { TitleSectionDiv } from "../Home/sections/Title/Title.styles";
import { ContactContainer } from "./styles/styles";
import { Link } from "react-router-dom";
import ThemeContext from "../../context/theme/themeContext";

//!!!!!! NOT AANY
const ContactPage: FunctionComponent = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <Main theme={theme}>
      <TitleSectionDiv theme={theme}>
        <TerminalBox theme={theme}>
          <MainHeading>Contact</MainHeading>
        </TerminalBox>

        <Link to="/contact" style={{ textDecoration: "none" }}>
          <TerminalButton theme={theme}>
            <ButtonTextLarge>website </ButtonTextLarge>
          </TerminalButton>
        </Link>

        <ContactContainer>
          <Link to="/help" style={{ textDecoration: "none" }}>
            <TerminalButton theme={theme}>
              <ButtonTextLarge>email</ButtonTextLarge>
            </TerminalButton>
          </Link>

          <Link to="/console" style={{ textDecoration: "none" }}>
            <TerminalButton theme={theme}>
              <ButtonTextLarge>twitter</ButtonTextLarge>
            </TerminalButton>
          </Link>

          <Link to="/contact" style={{ textDecoration: "none" }}>
            <TerminalButton theme={theme}>
              <ButtonTextLarge>github</ButtonTextLarge>
            </TerminalButton>
          </Link>
        </ContactContainer>
      </TitleSectionDiv>
    </Main>
  );
};

export default ContactPage;
