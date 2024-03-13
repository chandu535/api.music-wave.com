import { Router } from "express";
import userRoutes from "./users/index";
const router: Router = Router();

router.use("/", userRoutes);

export default router;
