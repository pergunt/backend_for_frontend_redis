import { Router } from "express";
import { productController } from "controllers";

const router = Router();

router.get("/products", productController.getList);
router.get("/products/:id", productController.getOne);

export default router;
