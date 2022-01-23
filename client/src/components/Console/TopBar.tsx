import { useContext } from "react";
import { TopBarContainer } from "./styles/TopBar.styles";
import { Title } from "./styles/TopBar.styles";
import ThemeContext from "../../context/theme/themeContext";

export default function TopBar() {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <TopBarContainer theme={theme}>
      <Title>Tasky - not logged in.</Title>
    </TopBarContainer>
  );
}
