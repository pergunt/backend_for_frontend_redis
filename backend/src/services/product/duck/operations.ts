import { Product } from "types";
import { PORT } from "consts";

export const getImageURL = ({ title, category, images }: Product) => {
  const [url] = images;
  const imagesPath = url.substring(url.lastIndexOf("/"));

  return `http://localhost:${PORT}/api/products/images/${category}/${title}${imagesPath}`;
};
