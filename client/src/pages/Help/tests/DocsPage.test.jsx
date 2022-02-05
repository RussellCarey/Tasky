import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DocsPage from "../index";
import ThemeContext from "../../../context/theme/themeContext";

test("Check  failed payment page renders", async () => {
  const theme = {};
  const uiCommandMap = {};

  render(
    <MemoryRouter initialEntries={["/docs"]}>
      <ThemeContext.Provider
        value={{
          theme,
          uiCommandMap,
        }}
      >
        <DocsPage />
      </ThemeContext.Provider>
    </MemoryRouter>
  );

  const testElement = screen.getByText(/To use this app you first/i);
  expect(testElement).toBeInTheDocument();
});
