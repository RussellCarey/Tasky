import { screen, render, waitFor } from "../../../mocks/customRender";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ConsolePage from "../../Console/index";

////////////////////////////////////////////////////////////////////////
// I should move these into one test function as I need to re-render the component each time.
////////////////////////////////////////////////////////////////////////
const clearTextFromWindow = (b: HTMLElement) => {
  userEvent.click(b);
  userEvent.type(b, "clear");
  userEvent.keyboard("[Enter]");
};

test("Test all commaneds", async () => {
  window.HTMLElement.prototype.scrollTo = function () {};

  render(
    <MemoryRouter initialEntries={["/console"]}>
      <ConsolePage />
    </MemoryRouter>,
    null
  );

  const inputBox = screen.getByPlaceholderText(/Enter command../i);
  expect(inputBox).toBeInTheDocument();

  // Show help command
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "show help");
  userEvent.keyboard("[Enter]");

  const textArea = await screen.findByText(/Below are some quick help commands/i);
  expect(textArea).toBeInTheDocument();

  // Test login command
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "login username 12345678");
  userEvent.keyboard("[Enter]");

  const loginText = await screen.findByText(/Logged into your account./i);
  expect(loginText).toBeInTheDocument();

  // logout Text
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "logout");
  userEvent.keyboard("[Enter]");

  const logoutText = await screen.findByText(/Logged out/i);
  expect(logoutText).toBeInTheDocument();

  // Signup Text
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "signup username email@email.com 11111111 11111111");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const signupText = screen.getByText(/Welcome, you are all signed up/i);
    expect(signupText).toBeInTheDocument();
  });

  // Get user info
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "show info");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const infoText = screen.getByText(/Your information:/i);
    expect(infoText).toBeInTheDocument();
  });

  // Change password
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "change password old new new");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const passwordChangeText = screen.getByText(/Your password has been changed./i);
    expect(passwordChangeText).toBeInTheDocument();
  });

  // Change email
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "change email old new new");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const textChange = screen.getByText(/Your email has been changed./i);
    expect(textChange).toBeInTheDocument();
  });

  // Delete account
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "delete account password password");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const textChange = screen.getByText(/Your account has been deleted./i);
    expect(textChange).toBeInTheDocument();
  });

  // Add new task name
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "add new task name Test Name");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const textChange = screen.getByText(/Task name was added!/i);
    expect(textChange).toBeInTheDocument();
  });

  // Add new task
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "add new task 1 1");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const textChange = screen.getByText(/Task was added!/i);
    expect(textChange).toBeInTheDocument();
  });

  // Get task names
  // userEvent.click(inputBox);
  // userEvent.type(inputBox, "show task names");
  // userEvent.keyboard("[Enter]");

  // await waitFor(() => {
  //   const textChange = screen.getByText(/Tasks/i);
  //   expect(textChange).toBeInTheDocument();
  // });

  // Delete task name
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "delete task name 1");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const textChange = screen.getByText(/Your task name was deleted./i);
    expect(textChange).toBeInTheDocument();
  });

  // Show task on a date
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "show tasks for 01/01/2022");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const textChange = screen.getByText(/Sorry, you have no tasks./i);
    expect(textChange).toBeInTheDocument();
  });

  // Show task from date range
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "show tasks from 2022/01/01 2022/02/01");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const textChange = screen.getByText(/Sorry, you have no tasks./i);
    expect(textChange).toBeInTheDocument();
  });

  // Deletetask on range
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "delete tasks from 2022/01/01 2022/02/01");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const textChange = screen.getByText(/Deleted Tasks/i);
    expect(textChange).toBeInTheDocument();
  });

  // Delete task on date
  clearTextFromWindow(inputBox);
  userEvent.click(inputBox);
  userEvent.type(inputBox, "delete tasks for 2022/01/01");
  userEvent.keyboard("[Enter]");

  await waitFor(() => {
    const textChange = screen.getByText(/Deleted Tasks/i);
    expect(textChange).toBeInTheDocument();
  });
});
