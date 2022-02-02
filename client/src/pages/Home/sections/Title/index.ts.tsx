import { FunctionComponent } from "react";
import { MainHeading, TerminalBox, TerminalButton, ButtonTextLarge, SubHeading } from "../../../styles/styles";
import { TitleSectionDiv, ButtonContainer } from "./Title.styles";
import { Link } from "react-router-dom";

//!!!!!! NOT AANY
const TitleSection: FunctionComponent<any> = ({ theme }) => {
  return (
    <TitleSectionDiv theme={theme}>
      <TerminalBox theme={theme}>
        <MainHeading>Tasky</MainHeading>
      </TerminalBox>
      <TerminalBox theme={theme}>
        <SubHeading>The simple task and time recorder.</SubHeading>
      </TerminalBox>

      {/* Go to the docs */}
      <ButtonContainer>
        <Link to="/help" style={{ textDecoration: "none" }}>
          <TerminalButton theme={theme}>
            <ButtonTextLarge>docs</ButtonTextLarge>
          </TerminalButton>
        </Link>

        {/* Go to the console */}
        <Link to="/console" style={{ textDecoration: "none" }}>
          <TerminalButton theme={theme}>
            <ButtonTextLarge>console</ButtonTextLarge>
          </TerminalButton>
        </Link>

        {/* Go to the account page */}
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <TerminalButton theme={theme}>
            <ButtonTextLarge>contact</ButtonTextLarge>
          </TerminalButton>
        </Link>
      </ButtonContainer>
    </TitleSectionDiv>
  );
};

export default TitleSection;
