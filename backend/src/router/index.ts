import { Router } from "express";
import { productController, imagesController } from "controllers";

const router = Router();

router.get("/products", productController.getList);
router.get("/products/category/:category", productController.getByCategory);
router.get("/products/search", productController.search);
router.get("/products/category-list", productController.getCategoryList);
router.get("/products/:id", productController.getOne);

router.get(
  "/products/images/:category/:title/:fileID",
  imagesController.getOne
);

export default router;
