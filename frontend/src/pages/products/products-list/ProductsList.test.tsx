import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes, Navigate } from "components";
import MockAdapter from "axios-mock-adapter";
import ProductsList from "./ProductsList";
import ProductDetails from "pages/products/product-details";
import CatchAll from "pages/catch-all";
import { API, routes } from "configs";

const mock = new MockAdapter(API);

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 10,
    images: ["image1.jpg"],
    description: "description 1",
    brand: "brand 1",
    category: "category 1",
  },
  {
    id: 2,
    title: "Product 2",
    price: 20,
    images: ["image2.jpg"],
    description: "description 1",
    brand: "brand 1",
    category: "category 1",
  },
] as const;

mock.onGet(/^(?:\/category\/\w+)?$/).reply(200, {
  total: mockProducts.length,
  products: mockProducts,
});

// Mock for individual product
mock.onGet(/\/[0-9]+/).reply((config) => {
  const id = config.url?.match(/\d+/)?.[0];

  const product = mockProducts.find((p) => p.id === (Number(id) || null));

  return [200, product];
});

describe("ProductsList", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path={routes.products} element={<ProductsList />} />
          <Route path={routes.productDetails()} element={<ProductDetails />} />
          <Route path="/" element={<Navigate to={routes.products} />} />
          <Route path="*" element={<CatchAll />} />
        </Routes>
      </BrowserRouter>
    );
  });

  const rendersListItems = async () => {
    expect(screen.queryByTestId("products-list-item")).toBeNull();

    expect(await screen.findAllByTestId("products-list-item")).toHaveLength(
      mockProducts.length
    );

    const [product] = mockProducts;

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(`${product.price}$`)).toBeInTheDocument();
    expect(screen.getAllByAltText("Product avatar")).toHaveLength(
      mockProducts.length
    );
  };

  test("renders list items", async () => {
    await rendersListItems();
  });

  // this could've been separated, but I didn't want to create additional files and duplicate tests
  test("Navigates to the details page, fetches a record, renders it and goes back", async () => {
    const [link] = await screen.findAllByTestId("products-list-item");
    const [product] = mockProducts;

    fireEvent.click(link);

    // navigated to the details page
    expect(screen.queryByTestId("pre-loader")).toBeInTheDocument();

    const goBack = await screen.findByText("Go Back");

    expect(goBack).toBeInTheDocument();

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText(`${product.price}$`)).toBeInTheDocument();

    await userEvent.click(goBack);

    await rendersListItems();
  });
});
