import React, { FunctionComponent } from "react";
import { MainHeading, TerminalBox, TerminalButton, SmallHeading, SubHeading } from "./styles/styles";
import { TitleSectionDiv, ButtonContainer } from "./styles/TitleSection.styles";

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
            <SmallHeading>docs</SmallHeading>
          </TerminalButton>
        </Link>

        {/* Go to the console */}
        <Link to="/console" style={{ textDecoration: "none" }}>
          <TerminalButton theme={theme}>
            <SmallHeading>console</SmallHeading>
          </TerminalButton>
        </Link>

        {/* Go to the account page */}
        <Link to="/account" style={{ textDecoration: "none" }}>
          <TerminalButton theme={theme}>
            <SmallHeading>account</SmallHeading>
          </TerminalButton>
        </Link>
      </ButtonContainer>
    </TitleSectionDiv>
  );
};

export default TitleSection;
