import { FunctionComponent, useContext } from "react";
import { MainHeading, ButtonTextLarge } from "../styles/styles";
import { ContactMain, ContactHeading, ContactButton } from "./styles/styles";
import NavBar from "../common/NavBar";
import ThemeContext from "../../context/theme/themeContext";

//!!!!!! NOT AANY
const ContactPage: FunctionComponent = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <ContactMain theme={theme}>
      <NavBar title={"Contact"} />

      <ContactHeading theme={theme}>
        <MainHeading>Contact</MainHeading>
      </ContactHeading>

      <a
        href="https://www.russell-carey.com"
        target="_blank"
        rel="noopener"
        aria-label="Homepage"
        style={{ textDecoration: "none" }}
      >
        <ContactButton theme={theme}>
          <ButtonTextLarge>website</ButtonTextLarge>
        </ContactButton>
      </a>

      <a
        href="mailto:russell_carey@hotmail.co.uk"
        rel="noopener"
        target="_blank"
        aria-label="Email"
        style={{ textDecoration: "none" }}
      >
        <ContactButton theme={theme}>
          <ButtonTextLarge>email</ButtonTextLarge>
        </ContactButton>
      </a>

      <a
        href="https://www.twitter.com/russellcareyy"
        target="_blank"
        rel="noopener"
        aria-label="Github"
        style={{ textDecoration: "none" }}
      >
        <ContactButton theme={theme}>
          <ButtonTextLarge>twitter</ButtonTextLarge>
        </ContactButton>
      </a>

      <a
        href="https://github.com/russellcarey"
        target="_blank"
        rel="noopener"
        aria-label="Github"
        style={{ textDecoration: "none" }}
      >
        <ContactButton theme={theme}>
          <ButtonTextLarge>github</ButtonTextLarge>
        </ContactButton>
      </a>
    </ContactMain>
  );
};

export default ContactPage;
