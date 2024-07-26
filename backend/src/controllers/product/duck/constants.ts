export const CACHE_KEYS = {
  PRODUCT_LIST: (limit: string | number) => `PRODUCT_LIST/${limit}`,
  PRODUCT_SEARCH: (value: string) => `PRODUCT_LIST/search?q=${value}`,
  PRODUCT_DETAILS: (id: number) => `PRODUCT_DETAILS/${id}`,
  PRODUCT_CATEGORIES: "PRODUCT_CATEGORIES",
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
} as const;
