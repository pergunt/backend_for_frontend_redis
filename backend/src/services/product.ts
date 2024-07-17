import { API_URL } from "consts";
import fetch from "node-fetch";

export const getList = async () => {
  return fetch(API_URL).then((res) => res.json());
};

export const getByID = async (id: number) => {
  return fetch(`${API_URL}/${id}`).then((res) => res.json());
};

export const getCategoryList = async () => {
  return fetch(`${API_URL}/category-list`).then((res) => res.json());
};
