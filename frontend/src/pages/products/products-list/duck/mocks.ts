export const products = [
  {
    id: 1,
    title: "Product1",
    price: 10,
    images: ["image1.jpg"],
    description: "description 1",
    brand: "brand 1",
    category: "category 1",
  },
  {
    id: 2,
    title: "Product 2",
    price: 20,
    images: ["image2.jpg"],
    description: "description 1",
    brand: "brand 1",
    category: "category 2",
  },
] as const;

export const productCategories = products.map((item) => item.category);
