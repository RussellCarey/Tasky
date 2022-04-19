import { screen, render } from "../../../mocks/customRender";
import { MemoryRouter } from "react-router-dom";
import AuthPage from "../../Auth/index";

test("Auth Page loads with failure", async () => {
  window.HTMLElement.prototype.scrollTo = function () {};

  render(
    <MemoryRouter initialEntries={["/auth"]}>
      <AuthPage />
    </MemoryRouter>,
    null
  );

  const inputBox = await screen.findByText(/Error/i);
  expect(inputBox).toBeInTheDocument();
});

test("Auth page loads with success", async () => {
  window.HTMLElement.prototype.scrollTo = function () {};

  render(
    <MemoryRouter initialEntries={["/auth?=stringhere"]}>
      <AuthPage />
    </MemoryRouter>,
    null
  );

  const successText = await screen.findByText(/Account activiated/i);
  expect(successText).toBeInTheDocument();
});
