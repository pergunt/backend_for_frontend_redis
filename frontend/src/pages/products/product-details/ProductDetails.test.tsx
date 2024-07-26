import { render, RenderResult, act } from "@testing-library/react";
import { BrowserRouter } from "components";
import ProductDetailsComponent from "./ProductDetails";
import { products } from "mocks";

describe("ProductDetails", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    jest.useFakeTimers();

    await act(async () => {
      renderResult = render(
        <BrowserRouter>
          <ProductDetailsComponent getOne={products.getMockedAPI().getOne} />
        </BrowserRouter>
      );
    });
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
  });

  test("Render a preloader", async () => {
    const preLoader = renderResult.getByTestId("pre-loader");

    expect(preLoader).toBeInTheDocument();
  });

  test("Render product details", async () => {
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    const preLoader = renderResult.queryByTestId("pre-loader");
    expect(preLoader).not.toBeInTheDocument();

    const [product] = products.data;

    expect(renderResult.getByText(product.title)).toBeInTheDocument();
    expect(renderResult.getByText(product.description)).toBeInTheDocument();
    expect(renderResult.getByText(product.brand)).toBeInTheDocument();
    expect(renderResult.getByText(product.category)).toBeInTheDocument();
    expect(renderResult.getByText(`${product.price}$`)).toBeInTheDocument();
  });
});
