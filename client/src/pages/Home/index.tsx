import React, { useContext } from "react";
import { Main } from "./styles/styles";
import TitleSection from "./TitleSection";

import ThemeContext from "../../context/theme/themeContext";

function Index() {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <Main theme={theme}>
      <TitleSection theme={theme} />
    </Main>
  );
}

export default Index;