import { Router } from "express";
import { BrandsController } from "../../controllers/brands";

const router: Router = Router();
const brandsController = new BrandsController();

router.get("/user/brands", brandsController.getAllBrands);

export default router;
