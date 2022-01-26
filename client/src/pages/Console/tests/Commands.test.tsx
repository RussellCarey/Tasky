import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

test("Command: show help", async () => {
  window.HTMLElement.prototype.scrollTo = function () {};
  render(<App />);

  const inputBox = screen.getByPlaceholderText(/Enter command../i);
  expect(inputBox).toBeInTheDocument();

  userEvent.click(inputBox);
  userEvent.type(inputBox, "show help");
  userEvent.keyboard("[Enter]");

  const textArea = await screen.findByText(/-- Help/i);
  expect(textArea).toBeInTheDocument();
});

test("Command: clear.", async () => {
  window.HTMLElement.prototype.scrollTo = function () {};
  render(<App />);

  const textArea = screen.getByText(/Welcome to Tasky the task recorder./i);
  expect(textArea).toBeInTheDocument();

  const inputBox = screen.getByPlaceholderText(/Enter command../i);
  expect(inputBox).toBeInTheDocument();

  userEvent.click(inputBox);
  userEvent.type(inputBox, "clear");
  userEvent.keyboard("[Enter]");

  await waitForElementToBeRemoved(() => screen.queryByText(/Welcome to Tasky the task recorder./i));
  const changedTextArea = screen.queryByText(/Welcome to Tasky the task recorder./i);
  expect(changedTextArea).toBeNull();
});
