import { Router } from "express";
import userCategories from "./categories";
import authRouter from "./auth";
import userBrands from "./brands";
import userProducts from "./productcs";

const router: Router = Router();

router.use(authRouter);
router.use(userCategories);
router.use(userBrands);
router.use(userProducts);

export default router;
