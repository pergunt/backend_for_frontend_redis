import { render, screen } from "@testing-library/react";
import App from "./App";

test("contains error box for rendering a snackbar from within axios's interceptors", () => {
  render(<App />);

  const errorBox = screen.getByTestId("error-box");

  expect(errorBox).toBeInTheDocument();
});
