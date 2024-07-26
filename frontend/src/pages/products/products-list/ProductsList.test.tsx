import { render, act, RenderResult } from "@testing-library/react";
import { BrowserRouter } from "components";
import ProductsList from "./ProductsList";
import { products } from "mocks";

describe("ProductsList", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    await act(async () => {
      renderResult = render(
        <BrowserRouter>
          <ProductsList api={products.getMockedAPI()} />
        </BrowserRouter>
      );
    });
  });

  test("Render list items", async () => {
    const fetchedItems = await renderResult.findAllByTestId(
      "products-list-item"
    );

    expect(fetchedItems).toHaveLength(products.data.length);
  });
});
