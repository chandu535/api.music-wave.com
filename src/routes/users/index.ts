import { Router } from "express";
import userCategories from "./categories";
import authRouter from "./auth";
import userBrands from "./brands";

const router: Router = Router();

router.use(authRouter);
router.use(userCategories);
router.use(userBrands);

export default router;
