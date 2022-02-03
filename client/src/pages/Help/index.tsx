import { FunctionComponent, useContext } from "react";
import NavBar from "../common/NavBar";
import ThemeContext from "../../context/theme/themeContext";
import { HelpMain, HelpWindow, InfoText } from "./styles/styles";
import { SubHeading } from "../styles/styles";
import CommandInfo from "./CommandInfo";
import { commandHelpText, documentExplanation } from "./constants/text";

const DocsPage: FunctionComponent = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <HelpMain theme={theme}>
      <NavBar title={"Docs"} />

      <HelpWindow theme={theme}>
        {documentExplanation.split("\n").map((i) => (
          <InfoText>{i}</InfoText>
        ))}
      </HelpWindow>

      <HelpWindow theme={theme}>
        {commandHelpText.map((commands) => {
          return <CommandInfo theme={theme} command={commands.name} text={commands.info} />;
        })}
      </HelpWindow>
    </HelpMain>
  );
};

export default DocsPage;
