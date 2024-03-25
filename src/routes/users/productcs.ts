import { Router } from "express";
import { ProductsController } from "../../controllers/products";

const router: Router = Router();
const productsController = new ProductsController();

router.get("/user/products", productsController.getAllProducts);

export default router;
