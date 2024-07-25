import { API } from "configs";
import { Product } from "types";

const productsAPI = {
  baseURL: "/products",
  getOne(id: number | string) {
    return API.get(`${this.baseURL}/${id}`);
  },
  getList(limit: number | void) {
    return API.get<{
      products: Product[];
      total: number;
      skip: number;
    }>(`${this.baseURL}?limit=${limit || 25}`);
  },
  search(value: string) {
    return API.get<Product[]>(`${this.baseURL}/search?q=${value}`);
  },
  getByCategory(category: string) {
    return API.get<Product[]>(`${this.baseURL}/category/${category}`);
  },
  getCategories() {
    return API.get<string[]>(`${this.baseURL}/category-list`);
  },
};

export default productsAPI;
