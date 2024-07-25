import productsAPI from "./productsAPI";
import imagesAPI from "./imagesAPI";

export type ProductsAPI = typeof productsAPI;
export type ImagesAPI = typeof imagesAPI;

export { productsAPI, imagesAPI };
