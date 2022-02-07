import { render, screen } from "../../../mocks/customRender";
import { MemoryRouter } from "react-router-dom";
import Paymentpage from "../index";

test("Check  failed payment page renders", async () => {
  render(
    <MemoryRouter initialEntries={["/payment"]}>
      <Paymentpage />
    </MemoryRouter>,
    null
  );

  const testElement = screen.getByText(/Something went wrong/i);
  expect(testElement).toBeInTheDocument();
});

test("Check success payment page renders", async () => {
  render(
    <MemoryRouter initialEntries={["/payment?=success"]}>
      <Paymentpage />
    </MemoryRouter>,
    null
  );

  const testElement = screen.getByText(/Your payment was a success./i);
  expect(testElement).toBeInTheDocument();
});
