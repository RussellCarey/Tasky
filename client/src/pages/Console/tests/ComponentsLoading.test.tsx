import { render, screen } from "@testing-library/react";
import App from "../../../App";

test.skip("Check heading renders", () => {
  window.HTMLElement.prototype.scrollTo = function () {};
  render(<App />);

  const titleElement = screen.getByRole("heading", { name: /tasky/i });
  expect(titleElement).toBeInTheDocument();
});

test.skip("Check text area renders", () => {
  window.HTMLElement.prototype.scrollTo = function () {};
  render(<App />);

  const partialText = screen.getByText(/Welcome to Tasky the task recorder./i);
  expect(partialText).toBeInTheDocument();
});

test.skip("Check input area renders", () => {
  window.HTMLElement.prototype.scrollTo = function () {};
  render(<App />);

  const inputBox = screen.getByPlaceholderText(/Enter command../i);
  expect(inputBox).toBeInTheDocument();
});
