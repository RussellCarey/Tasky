import { screen, render, waitFor } from "../../../mocks/customRender";
import "jest-styled-components";
import userEvent from "@testing-library/user-event";
import App from "../../../App";
////////////////////////////////////////////////////////////////////////
// I should move these into one test function as I need to re-render the component each time.
////////////////////////////////////////////////////////////////////////
const clearTextFromWindow = (b: HTMLElement) => {
  userEvent.click(b);
  userEvent.type(b, "clear");
  userEvent.keyboard("[Enter]");
};

test("Test all UI commands", async () => {
  window.HTMLElement.prototype.scrollTo = function () {};

  render(<App />, null);

  const consoleButton = screen.getByText("console");
  userEvent.click(consoleButton);

  const inputBox = screen.getByPlaceholderText(/Enter command../i);
  expect(inputBox).toBeInTheDocument();

  // Change background command
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "set background color #4e834e");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const bg = screen.getByTestId("background");
    expect(bg).toHaveStyle(`background-color: rgb(78, 131, 78)`);
  });

  // Change border command
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "set border color #4e834e");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const window = screen.getByTestId("mainWindow");
    expect(window).toHaveStyleRule("borderColor: rgb(78, 131, 78)");
  });

  // Change text command
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "set text color #4e834e");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const text = screen.getByText(/Changed text color/i);
    expect(text).toHaveStyleRule("color: rgb(78, 131, 78)");
  });

  // Change shadow command
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "set shadow color #4e834e");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const window = screen.getByTestId("mainWindow");
    expect(window).toHaveStyleRule("boxShadow: 20px 20px 0px rgb(78, 131, 78)");
  });

  // Change terminal color command
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "set terminal color #4e834e");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const window = screen.getByTestId("mainWindow");
    expect(window).toHaveStyleRule("backgroundColor: rgb(78, 131, 78)");
  });
});
