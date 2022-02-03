import React, { useContext } from "react";
import { Container } from "../styles/styles";
import TitleSection from "./sections/Title/index.ts";

import ThemeContext from "../../context/theme/themeContext";

function Index() {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <Container theme={theme}>
      <TitleSection theme={theme} />
    </Container>
  );
}

export default Index;
