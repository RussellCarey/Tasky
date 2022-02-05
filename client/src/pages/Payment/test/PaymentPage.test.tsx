import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Paymentpage from "../index";
import ThemeContext from "../../../context/theme/themeContext";

test("Check  failed payment page renders", async () => {
  const theme = {};
  const uiCommandMap = {};

  render(
    <MemoryRouter initialEntries={["/payment"]}>
      <ThemeContext.Provider
        value={{
          theme,
          uiCommandMap,
        }}
      >
        <Paymentpage />
      </ThemeContext.Provider>
    </MemoryRouter>
  );

  const testElement = screen.getByText(/Something went wrong/i);
  expect(testElement).toBeInTheDocument();
});

test("Check success payment page renders", async () => {
  const theme = {};
  const uiCommandMap = {};

  render(
    <MemoryRouter initialEntries={["/payment?=success"]}>
      <ThemeContext.Provider
        value={{
          theme,
          uiCommandMap,
        }}
      >
        <Paymentpage />
      </ThemeContext.Provider>
    </MemoryRouter>
  );

  const testElement = screen.getByText(/Your payment was a success./i);
  expect(testElement).toBeInTheDocument();
});
