import { FunctionComponent } from "react";
import { MainHeading, TerminalBox, ButtonTextLarge, SubHeading } from "../../../styles/styles";
import { TitleContainer, TitleItems, ButtonContainer, TitleButton } from "./Title.styles";
import { Link } from "react-router-dom";

const TitleSection: FunctionComponent<any> = ({ theme }) => {
  return (
    <TitleContainer theme={theme}>
      <TitleItems>
        <TerminalBox theme={theme}>
          <MainHeading>Tasky</MainHeading>
        </TerminalBox>

        <TerminalBox theme={theme}>
          <SubHeading>The simple task and time recorder.</SubHeading>
        </TerminalBox>

        {/* Go to the docs */}
        <ButtonContainer>
          <Link to="/help" style={{ textDecoration: "none" }}>
            <TitleButton theme={theme}>
              <ButtonTextLarge>docs</ButtonTextLarge>
            </TitleButton>
          </Link>

          {/* Go to the console */}
          <Link to="/console" style={{ textDecoration: "none" }}>
            <TitleButton theme={theme}>
              <ButtonTextLarge>console</ButtonTextLarge>
            </TitleButton>
          </Link>

          {/* Go to the account page */}
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <TitleButton theme={theme}>
              <ButtonTextLarge>contact</ButtonTextLarge>
            </TitleButton>
          </Link>
        </ButtonContainer>
      </TitleItems>
    </TitleContainer>
  );
};

export default TitleSection;
