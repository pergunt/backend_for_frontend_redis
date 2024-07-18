import { API_URL } from "consts";
import { ParsedQs } from "qs";
import axios from "axios";

const API = axios.create({
  baseURL: API_URL,
});

const selectedKeys = "id,title,price,category,images";

export const getList = async (query: ParsedQs) => {
  const url = query.search
    ? `/search?q=${query.search}`
    : `?limit=${query.limit || 25}`;

  const { data } = await API.get(`${url}&select=${selectedKeys}`);

  return data;
};

export const getByID = async (id: number) => {
  const { data } = await API.get(
    `/${id}?select=${selectedKeys},description,brand`
  );

  return data;
};

export const getCategoryList = async () => {
  const { data } = await API.get("/category-list");

  return data;
};

export const getByCategory = async (category: string) => {
  const { data } = await API.get(`/category/${category}`);

  return data;
};
