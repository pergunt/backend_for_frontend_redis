import { API } from "configs";
import { Product } from "types";
import { createQueryParam } from "utils";

const productsAPI = {
  baseURL: "/products",

  getOne({ id, select }: { id: number | string; select: string }) {
    const queryParam = createQueryParam({
      char: "?",
      select,
    });

    return API.get(`${this.baseURL}/${id}${queryParam}`);
  },
  getList({ limit, select }: { limit: number | void; select: string }) {
    const queryParam = createQueryParam({
      char: "&",
      select,
    });

    return API.get<{
      products: Product[];
      total: number;
      skip: number;
    }>(`${this.baseURL}?limit=${limit || 25}${queryParam}`);
  },
  search({ select, value }: { value: string; select?: string }) {
    const queryParam = createQueryParam({
      char: "&",
      select,
    });

    return API.get<{ products: Product[] }>(
      `${this.baseURL}/search?q=${value}${queryParam}`
    );
  },
  getByCategory(category: string) {
    return API.get<{ products: Product[] }>(
      `${this.baseURL}/category/${category}`
    );
  },
  getCategories() {
    return API.get<string[]>(`${this.baseURL}/category-list`);
  },
};

export default productsAPI;
