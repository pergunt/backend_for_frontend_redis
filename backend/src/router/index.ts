import { Router } from "express";
import { productController } from "controllers";

const router = Router();

router.get("/products", productController.getList);
router.get("/products/category-list", productController.getCategoryList);
router.get("/products/:id", productController.getOne);

export default router;
