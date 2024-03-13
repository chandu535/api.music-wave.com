import { Router } from "express";
import { AuthController } from "../../controllers/auth";

const router: Router = Router();
const authController = new AuthController();

router.post("/user/signup", authController.signUpUser);

export default router;
