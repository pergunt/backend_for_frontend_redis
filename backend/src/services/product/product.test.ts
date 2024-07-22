import MockAdapter from "axios-mock-adapter";
import qs from "node:querystring";
import { API } from "configs";
import * as productService from "./index";
import { constants, operations } from "./duck";

const mock = new MockAdapter(API);

const mockProducts = [
  {
    id: 1,
    title: "Product1",
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
    images: ["/image2.jpg"],
    description: "description 1",
    brand: "brand 1",
    category: "category 1",
  },
  {
    id: 3,
    title: "Product 3",
    price: 20,
    images: ["/image2.jpg"],
    description: "description 3",
    brand: "brand 3",
    category: "category 1", // (!) same category
  },
].map((item) => ({
  ...item,
  src: operations.getImageURL(item),
}));
const mockedCategories = mockProducts.map((item) => item.category);

const filterProductsByCategory = (category: string) =>
  mockProducts.filter((item) => item.category === category);

mock.onGet(`/products?limit=25&select=${constants.SELECTED_KEYS}`).reply(200, {
  total: mockProducts.length,
  products: mockProducts,
});

mock.onGet("/products/category-list").reply(200, mockedCategories);

mock.onGet(/\/products\/category\/\w+/).reply((config) => {
  const category = (config.url as string).replace("/products/category/", "");
  const products = filterProductsByCategory(category);

  return [
    200,
    {
      total: products.length,
      products,
    },
  ];
});

mock.onGet(/\/products\/\d+\?\w/).reply((config) => {
  const id = Number(config.url?.match(/\d+/)?.[0]);

  const product = mockProducts.find((p) => p.id === (id || null));

  return [200, product];
});

// Product search
mock.onGet(/\/products\/search\?q=\w+/).reply((config) => {
  const cleared = (config.url as string).replace("/products/search?", "");

  const { q } = qs.decode(cleared) as { q: string };

  const products = mockProducts.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase())
  );

  return [200, { products }];
});

test("Return a product by ID", async () => {
  const [product] = mockProducts;
  const result = await productService.getByID(product.id);

  expect(result).toEqual(product);
});

test("Search a product by title", async () => {
  const [product] = mockProducts;
  const { products } = await productService.getList(
    `/search?q=${product.title}`
  );

  expect(products).toEqual(
    mockProducts.filter((p) => p.title === product.title)
  );
});

test("Return a list", async () => {
  const { products } = await productService.getList("?limit=25");

  expect(products).toHaveLength(mockProducts.length);
});

test("Search products by categories", async () => {
  const [product] = mockProducts;
  const { products } = await productService.getByCategory(product.category);

  expect(products).toEqual(filterProductsByCategory(product.category));
});

test("Return categories list", async () => {
  const categories = await productService.getCategoryList();

  expect(categories).toEqual(mockedCategories);
});
