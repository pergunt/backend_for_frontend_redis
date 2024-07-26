export const mockProducts = [
  {
    id: 1,
    title: "Product1",
    price: 10,
    images: ["/image1.jpg"],
    description: "description 1",
    brand: "brand 1",
    category: "category 1",
  },
  {
    id: 2,
    title: "Product 2",
    price: 20,
    images: ["/image2.jpg"],
    description: "description 1",
    brand: "brand 1",
    category: "category 1",
  },
  {
    id: 3,
    title: "Product 3",
    price: 20,
    images: ["/image2.jpg"],
    description: "description 3",
    brand: "brand 3",
    category: "category 1", // (!) same category
  },
];

export const mockedCategories = mockProducts.map((item) => item.category);

export const getMockedAPI = () => ({
  baseURL: "/products",
  getOne: jest.fn().mockResolvedValue({
    data: mockProducts[0],
  }),
  search: jest.fn().mockImplementation(({ value }) =>
    Promise.resolve({
      data: {
        products: mockProducts.filter((product) => product.title === value),
      },
    })
  ),
  getCategories: jest.fn().mockResolvedValue({
    data: mockedCategories,
  }),
  getByCategory: jest.fn().mockImplementation((category) =>
    Promise.resolve({
      data: {
        products: mockProducts.filter(
          (product) => product.category === category
        ),
      },
    })
  ),
  getList: jest.fn().mockResolvedValue({
    data: {
      total: mockProducts.length,
      skip: 0,
      products: mockProducts,
    },
  }),
});
