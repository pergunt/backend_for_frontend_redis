import { ProductsService } from "services";
import { productsAPI } from "apis";
import { operations, constants } from "./duck";

const productsService = new ProductsService(productsAPI);

export const getList = operations.wrapper((req) => {
  const limit = Number(req.query.limit) || 25;

  return {
    cacheKey: constants.CACHE_KEYS.PRODUCT_LIST(limit),
    request: () => productsService.getList(limit),
  };
});

export const search = operations.wrapper((req) => {
  const { q } = req.query as { q: string };

  return {
    cacheKey: constants.CACHE_KEYS.PRODUCT_SEARCH(q),
    request: () => productsService.search(q),
  };
});

export const getOne = operations.wrapper<{ id: number }>((req) => {
  return {
    cacheKey: constants.CACHE_KEYS.PRODUCT_DETAILS(req.params.id),
    request: () => productsService.getByID(req.params.id),
  };
});

export const getCategoryList = operations.wrapper(() => {
  return {
    cacheKey: constants.CACHE_KEYS.PRODUCT_CATEGORIES,
    request: () => productsService.getCategoryList(),
  };
});

export const getByCategory = operations.wrapper<{ category: string }>((req) => {
  return {
    cacheKey: constants.CACHE_KEYS.PRODUCTS_BY_CATEGORY(req.params.category),
    request: () => productsService.getByCategory(req.params.category),
  };
});
