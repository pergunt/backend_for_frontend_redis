import { Router } from "express";
import { productController, filesController } from "controllers";

const router = Router();

router.get("/products", productController.getList);
router.get("/products/category-list", productController.getCategoryList);
router.get("/products/category/:category", productController.getByCategory);
router.get("/products/:id", productController.getOne);

router.get("/products/images/:category/:title/:fileID", filesController.getOne);

export default router;
