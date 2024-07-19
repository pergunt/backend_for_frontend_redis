import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import App from "App";
import qs from "query-string";
import { API } from "configs";
import { mocks } from "./duck";

const mock = new MockAdapter(API);

mock.onGet("/products").reply(200, {
  total: mocks.products.length,
  products: mocks.products,
});

// Mock for individual product
mock.onGet(/\/products\/[0-9]+/).reply((config) => {
  const id = config.url?.match(/\d+/)?.[0];

  const product = mocks.products.find((p) => p.id === (Number(id) || null));

  return [200, product];
});

// Mock for search
mock.onGet(/\/products\?search=\w+$/).reply((config) => {
  const cleared = (config.url as string).replace("/products", "");
  const { search } = qs.parse(cleared) as { search: string };

  const product = mocks.products.find((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return [200, product];
});

describe("ProductsList", () => {
  beforeEach(() => {
    render(<App />);
  });

  const rendersListItems = async () => {
    expect(screen.queryByTestId("products-list-item")).toBeNull();

    expect(await screen.findAllByTestId("products-list-item")).toHaveLength(
      mocks.products.length
    );

    const [product] = mocks.products;

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(`${product.price}$`)).toBeInTheDocument();
    expect(screen.getAllByAltText("Product avatar")).toHaveLength(
      mocks.products.length
    );
  };

  test("Render list", async () => {
    await rendersListItems();
  });

  // this could've been separated, but I didn't want to create additional files and duplicate tests
  test("Navigate to the details page, fetch a record, render it and go back", async () => {
    const [link] = await screen.findAllByTestId("products-list-item");
    const [product] = mocks.products;

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
