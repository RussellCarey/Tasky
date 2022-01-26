import { useContext } from "react";
import { TopBarContainer, CloseButton } from "./styles/TopBar.styles";
import { Title } from "./styles/TopBar.styles";

import ThemeContext from "../../context/theme/themeContext";

import { useNavigate } from "react-router-dom";

export default function TopBar() {
  let navigate = useNavigate();
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <TopBarContainer theme={theme}>
      <Title>Tasky - not logged in.</Title>
      <CloseButton onClick={() => navigate("/")}>X</CloseButton>
    </TopBarContainer>
  );
}
