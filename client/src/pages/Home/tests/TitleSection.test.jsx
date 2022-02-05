import { render, screen } from "@testing-library/react";
import App from "../../../App";

test("Check App loads", async () => {
  render(<App />);

  const testElement = screen.getByText(/Tasky/i);
  expect(testElement).toBeInTheDocument();
});
