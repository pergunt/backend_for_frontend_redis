import MockAdapter from "axios-mock-adapter";
import qs from "node:querystring";
import { API } from "configs";
import * as productService from "./product";

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
    images: ["image2.jpg"],
    description: "description 1",
    brand: "brand 1",
    category: "category 1",
  },
  {
    id: 3,
    title: "Product 3",
    price: 20,
    images: ["image2.jpg"],
    description: "description 3",
    brand: "brand 3",
    category: "category 1", // (!) same category
  },
] as const;
const mockedCategories = mockProducts.map((item) => item.category);

const filterProductsByCategory = (category: string) =>
  mockProducts.filter((item) => item.category === category);

mock
  .onGet(`/products?limit=25&select=${productService.selectedKeys}`)
  .reply(200, {
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

// Mock for individual product
mock.onGet(/\/[0-9]+/).reply((config) => {
  const id = config.url?.match(/\d+/)?.[0];

  const product = mockProducts.find((p) => p.id === (Number(id) || null));

  return [200, product];
});

mock
  .onGet(new RegExp(`\\?q=\\w+&select=${productService.selectedKeys}`))
  .reply((config) => {
    const cleared = (config.url as string).replace("/products/search?", "");

    const { q } = qs.decode(cleared) as { q: string };

    const product = mockProducts.find((p) =>
      p.title.toLowerCase().includes(q.toLowerCase())
    );

    return [200, product];
  });

test("Return a product by ID", async () => {
  const [product] = mockProducts;
  const result = await productService.getByID(product.id);

  expect(result).toEqual(product);
});

test("Search a product by title", async () => {
  const [product] = mockProducts;
  const result = await productService.getList({ search: product.title });

  expect(result).toEqual(product);
});

test("Return a list", async () => {
  const { products } = await productService.getList({ limit: "25" });

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
