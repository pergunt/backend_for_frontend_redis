import ProductsService from "./index";
import { mocks } from "./duck";

const filterProductsByCategory = (category: string) =>
  mocks.mockProducts.filter((item) => item.category === category);

describe("Product API", () => {
  const { mockProducts } = mocks;
  let productsService: ProductsService;

  beforeEach(() => {
    productsService = new ProductsService(mocks.getMockedAPI());
  });

  test("Return a product by ID", async () => {
    const [product] = mockProducts;
    const result = await productsService.getByID(product.id);

    expect(result).toEqual(product);
  });

  test("Search a product by title", async () => {
    const [product] = mockProducts;
    const products = await productsService.search(product.title);

    expect(products).toEqual(
      mockProducts.filter((p) => p.title === product.title)
    );
  });

  test("Return a list", async () => {
    const { products } = await productsService.getList(25);

    expect(products).toHaveLength(mockProducts.length);
  });

  test("Search products by categories", async () => {
    const [product] = mockProducts;
    const products = await productsService.getByCategory(product.category);

    expect(products).toEqual(filterProductsByCategory(product.category));
  });

  test("Return categories list", async () => {
    const categories = await productsService.getCategoryList();

    expect(categories).toEqual(mocks.mockedCategories);
  });
});
