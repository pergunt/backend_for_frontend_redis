import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "components";
import ProductsListHeader from "./ProductsListHeader";

describe("ListHeader", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ProductsListHeader />
      </BrowserRouter>
    );
  });

  test("contains a search input and category autocomplete", () => {
    const input = screen.getByLabelText("Search");
    const autocomplete = screen.getByTestId("category-autocomplete");

    expect(input).toBeInTheDocument();
    expect(autocomplete).toBeInTheDocument();
  });
});
