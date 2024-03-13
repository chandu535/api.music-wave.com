import { Router } from "express";
import { CategoryModel } from "../../models/categories";
import { CategoriesController } from "../../controllers/categories";

const router: Router = Router();
const categoryController = new CategoriesController();

router.get("/user/categories", categoryController.getAllCategories);

export default router;
