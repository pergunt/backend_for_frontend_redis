import { Product } from "types";
import { PORT } from "consts";

export const getImageURL = ({ images, ...product }: Product) => {
  const [url] = images;
  const imagesPath = url.substring(url.lastIndexOf("/"));

  return {
    ...product,
    src: `http://localhost:${PORT}/api/products/images/${product.category}/${product.title}${imagesPath}`,
  };
};
