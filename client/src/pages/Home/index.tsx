import React, { useContext } from "react";
import { Main } from "../common/styles";
import TitleSection from "./sections/Title/index.ts";

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
