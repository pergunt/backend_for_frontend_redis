const routes = {
  products: "/products",
  productDetails: (id?: number) => `/products/${id || ":id"}`,
} as const;

export default routes;
