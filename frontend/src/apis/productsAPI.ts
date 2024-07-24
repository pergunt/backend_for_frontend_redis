import { API } from "configs";
import { Product } from "types";

export const getList = (limit: number | void) =>
  API.get(`/products?limit=${limit || 25}`);

export const search = (value: string) =>
  API.get<Product[]>(`/products/search?q=${value}`);

export const getByCategory = (category: string) =>
  API.get<Product[]>(`/products/category/${category}`);

export const getCategories = () => API.get<string[]>("/products/category-list");
