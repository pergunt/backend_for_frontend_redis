import { ParsedQs } from "qs";
import { API } from "configs";

export const selectedKeys = "id,title,price,category,images";

export const getList = async (query: ParsedQs) => {
  const url = query.search
    ? `/search?q=${query.search}`
    : `?limit=${query.limit || 25}`;

  const { data } = await API.get(`/products${url}&select=${selectedKeys}`);

  return data;
};

export const getByID = async (id: number) => {
  const { data } = await API.get(
    `/products/${id}?select=${selectedKeys},description,brand`
  );

  return data;
};

export const getCategoryList = async () => {
  const { data } = await API.get("/products/category-list");

  return data;
};

export const getByCategory = async (category: string) => {
  const { data } = await API.get(`/products/category/${category}`);

  return data;
};
