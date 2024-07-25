const routes = {
  products: "/products",
  productDetails: (id?: number | string) => `/products/${id || ":id"}`,
} as const;

export default routes;
