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
  PRODUCT_SEARCH: (value: string) => `PRODUCT_LIST/${value}`,
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

        res.json(record);
      } else {
        res.json(JSON.parse(cachedRecord));
      }
    } catch (e) {
      next(e);
    }
  };

export const getList = wrapper((req) => {
  const url = `?limit=${req.query.limit || 25}`;

  return {
    cacheKey: CACHE_KEYS.PRODUCT_LIST(url),
    request: async () => {
      return productService.getList(url);
    },
  };
});

export const search = wrapper((req) => {
  const { q } = req.query as { q: string };

  return {
    cacheKey: CACHE_KEYS.PRODUCT_SEARCH(`/search?=${q}`),
    request: async () => {
      return productService.search(q);
    },
  };
});

export const getOne = wrapper<{ id: number }>((req) => {
  return {
    cacheKey: CACHE_KEYS.PRODUCT_DETAILS(req.params.id),
    request: () => {
      return productService.getByID(req.params.id);
    },
  };
});

export const getCategoryList = wrapper(() => {
  return {
    cacheKey: CACHE_KEYS.PRODUCT_CATEGORIES,
    request: productService.getCategoryList,
  };
});

export const getByCategory = wrapper<{ category: string }>((req) => {
  return {
    cacheKey: CACHE_KEYS.PRODUCTS_BY_CATEGORY(req.params.category),
    request: () => {
      return productService.getByCategory(req.params.category);
    },
  };
});
