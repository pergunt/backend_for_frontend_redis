import { API_URL } from "consts";
import { ParsedQs } from "qs";
import fetch from "node-fetch";

// TODO read about skip prop
export const getList = async (query: ParsedQs) => {
  const url = query.search
    ? `/search?q=${query.search}`
    : `?limit=${query.limit || 25}`;

  return fetch(`${API_URL}${url}&select=id,title,price,category,images`).then(
    (res) => res.json()
  );
};

export const getByID = async (id: number) => {
  return fetch(`${API_URL}/${id}`).then((res) => res.json());
};

export const getCategoryList = async () => {
  return fetch(`${API_URL}/category-list`).then((res) => res.json());
};

export const getByCategory = (category: string) => {
  return fetch(`${API_URL}/category/${category}`).then((res) => res.json());
};
