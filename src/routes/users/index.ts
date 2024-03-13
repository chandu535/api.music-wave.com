import { Router } from "express";
import userCategories from "./categories";
import authRouter from "./auth";

const router: Router = Router();

router.use(userCategories);
router.use(authRouter);

export default router;
