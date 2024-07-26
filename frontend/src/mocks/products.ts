import { AxiosResponse } from "axios";
import { ProductDetails } from "types";

export const data = [
  {
    id: 1,
    title: "Product1",
    price: 10,
    images: ["image1.jpg"],
    src: "image1.jpg",
    description: "description 1",
    brand: "brand 1",
    category: "category 1",
  },
  {
    id: 2,
    title: "Product 2",
    price: 20,
    images: ["image2.jpg"],
    src: "image1.jpg",
    description: "description 1",
    brand: "brand 1",
    category: "category 2",
  },
] as const;

export const categories = data.map((item) => item.category);

export const getMockedAPI = () => ({
  baseURL: "/products",
  getOne: jest.fn(() => {
    return new Promise<AxiosResponse<ProductDetails>>((resolve) => {
      setTimeout(() => {
        resolve({
          data: data[0],
        } as AxiosResponse);
      }, 1000);
    });
  }),
  search: jest.fn().mockResolvedValue({
    data,
  }),
  getCategories: jest.fn().mockResolvedValue({
    data: categories,
  }),
  getByCategory: jest.fn().mockResolvedValue({
    data,
  }),
  getList: jest.fn().mockResolvedValue({
    data: {
      total: data.length,
      skip: 0,
      products: data,
    },
  }),
});
