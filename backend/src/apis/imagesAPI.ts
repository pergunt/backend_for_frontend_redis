import axios from "axios";
import { API_IMAGE_URL } from "consts";

const productsAPI = {
  baseURL: `${API_IMAGE_URL}/products/images`,

  getOne({
    category,
    title,
    fileID,
  }: {
    category: string;
    title: string;
    fileID: string;
  }) {
    return axios.get(
      encodeURI(`${this.baseURL}/${category}/${title}/${fileID}`),
      {
        responseType: "stream",
      }
    );
  },
};

export default productsAPI;
