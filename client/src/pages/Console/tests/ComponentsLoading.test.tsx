import { render, screen } from "../../../mocks/customRender";
import { MemoryRouter } from "react-router-dom";
import ConsolePage from "../index";

test("Check heading renders", () => {
  window.HTMLElement.prototype.scrollTo = function () {};

  render(
    <MemoryRouter initialEntries={["/console"]}>
      <ConsolePage />
    </MemoryRouter>,
    null
  );

  const titleElement = screen.getByRole("heading", { name: /tasky/i });
  expect(titleElement).toBeInTheDocument();
});
