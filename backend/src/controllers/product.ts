import { productService } from "services";
import { NextFunction, Request, Response } from "express";
import { cache } from "configs";

type Fn<Params = void> = (
  req: Request<Params>,
  res: Response
) => {
  request: () => Promise<any>;
  cacheKey: string;
};

const CACHE_KEYS = {
  PRODUCT_LIST: (url: string) => `PRODUCT_LIST/${url}`,
  PRODUCT_DETAILS: (id: number) => `PRODUCT_DETAILS/${id}`,
  PRODUCT_CATEGORIES: "PRODUCT_CATEGORIES",
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
} as const;

const wrapper =
  <Params = void>(fn: Fn<Params>) =>
  async (req: Request<Params>, res: Response, next: NextFunction) => {
    try {
      const { request, cacheKey } = fn(req, res);

      const cachedRecord = await cache.get(cacheKey);

      if (!cachedRecord) {
        const record = await request();

        await cache.set(cacheKey, JSON.stringify(record));

        return record;
      }

      res.json(JSON.parse(cachedRecord));
    } catch (e) {
      next(e);
    }
  };

export const getList = wrapper((req, res) => {
  const url = req.query.search
    ? `/search?q=${req.query.search}`
    : `?limit=${req.query.limit || 25}`;

  return {
    cacheKey: CACHE_KEYS.PRODUCT_LIST(url),
    request: async () => {
      const products = await productService.getList(url);

      res.json(products);

      return products;
    },
  };
});

export const getOne = wrapper<{ id: number }>((req, res) => {
  return {
    cacheKey: CACHE_KEYS.PRODUCT_DETAILS(req.params.id),
    request: async () => {
      const response = await productService.getByID(req.params.id);

      res.json(response);

      return response;
    },
  };
});

export const getCategoryList = wrapper((req, res) => {
  return {
    cacheKey: CACHE_KEYS.PRODUCT_CATEGORIES,
    request: async () => {
      const categoryList = await productService.getCategoryList();

      res.json(categoryList);

      return categoryList;
    },
  };
});

export const getByCategory = wrapper<{ category: string }>((req, res) => {
  return {
    cacheKey: CACHE_KEYS.PRODUCTS_BY_CATEGORY(req.params.category),
    request: async () => {
      const response = await productService.getByCategory(req.params.category);

      res.json(response);

      return response;
    },
  };
});
