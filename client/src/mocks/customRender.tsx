import { render } from "@testing-library/react";
import ThemeContext from "../context/theme/themeContext";
import { FunctionComponent } from "react";

const provider: FunctionComponent = ({ children }) => {
  const theme = {};
  const uiCommandMap = {};

  return (
    <ThemeContext.Provider
      value={{
        theme,
        uiCommandMap,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const renderWithContext = (ui: any, options: any) => render(ui, { wrapper: provider, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
