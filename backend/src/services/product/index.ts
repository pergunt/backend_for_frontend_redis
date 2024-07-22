import { API } from "configs";
import { Product } from "types";
import { operations, constants } from "./duck";

export const getList = async (url: string) => {
  const {
    data: { products, ...data },
  } = await API.get<{ products: Product[] }>(
    `/products${url}&select=${constants.SELECTED_KEYS}`
  );

  return {
    ...data,
    products: products.map((product) => ({
      ...product,
      src: operations.getImageURL(product),
    })),
  };
};

export const getByID = async (id: number) => {
  const { data } = await API.get<Product>(
    `/products/${id}?select=${constants.SELECTED_KEYS}`
  );

  return {
    ...data,
    src: operations.getImageURL(data),
  };
};

export const getCategoryList = async () => {
  const { data } = await API.get("/products/category-list");

  return data;
};

export const getByCategory = async (category: string) => {
  const { data } = await API.get<{ products: Product[] }>(
    `/products/category/${category}`
  );

  return {
    ...data,
    products: data.products.map((product) => ({
      ...product,
      src: operations.getImageURL(product),
    })),
  };
};
