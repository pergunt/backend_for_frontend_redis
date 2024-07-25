import { ProductsAPI } from "apis";
import { operations, constants } from "./duck";

export default class ProductsService {
  api: ProductsAPI;

  constructor(api: ProductsAPI) {
    this.api = api;
  }

  async getList(limit: number) {
    const {
      data: { products, ...data },
    } = await this.api.getList({
      limit,
      select: constants.SELECTED_KEYS,
    });

    return {
      ...data,
      products: products.map(operations.getImageURL),
    };
  }

  async search(value: string) {
    const {
      data: { products },
    } = await this.api.search({
      value,
      select: constants.SELECTED_KEYS,
    });

    return products.map(operations.getImageURL);
  }

  async getByID(id: number) {
    const { data } = await this.api.getOne({
      id,
      select: constants.SELECTED_KEYS,
    });

    return operations.getImageURL(data);
  }

  async getCategoryList() {
    const { data } = await this.api.getCategories();

    return data;
  }

  async getByCategory(category: string) {
    const { data } = await this.api.getByCategory(category);

    return data.products.map(operations.getImageURL);
  }
}
