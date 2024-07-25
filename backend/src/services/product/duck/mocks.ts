import { getImageURL } from "./operations";

export const mockProducts = [
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
  src: getImageURL(item),
}));

export const mockedCategories = mockProducts.map((item) => item.category);

export const getMockedAPI = () => ({
  baseURL: "/products",
  getOne: jest.fn().mockResolvedValue({
    data: mockProducts[0],
  }),
  search: jest.fn().mockResolvedValue({
    data: mockProducts,
  }),
  getCategories: jest.fn().mockResolvedValue({
    data: mockProducts,
  }),
  getByCategory: jest.fn().mockResolvedValue({
    data: mockProducts,
  }),
  getList: jest.fn().mockResolvedValue({
    data: {
      total: mockProducts.length,
      skip: 0,
      products: mockProducts,
    },
  }),
});
