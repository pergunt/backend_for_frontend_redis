import { render, RenderResult } from "@testing-library/react";
import ProductListItem from "./ProductListItem";
import { products } from "mocks";

describe("ProductsList", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    const [product] = products.data;

    renderResult = render(<ProductListItem {...product} onClick={() => {}} />);
  });

  test("Render a product list item", async () => {
    const [product] = products.data;

    const avatar = renderResult.getByAltText("Product avatar");
    const title = renderResult.getByText(product.title);
    const price = renderResult.getByText(`${product.price}$`);

    expect(avatar).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
