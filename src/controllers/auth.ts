import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth";
import { signUpSchema } from "../lib/validators/signUpSchema";

const authService: AuthService = new AuthService();
export class AuthController {
  async signUpUser(req: Request, res: Response) {
    console.log(req.body);
    let { body = {} } = req;
    console.log(req.body);

    const response = signUpSchema.validate(body);
    console.log(123, response);

    res.status(200).json({ response });
  }
  public async signinWithEmailOrPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req;
      const response = await authService.signin(body);
      res.status(200).json(response);
    } catch (err) {
      console.log({ err });
    }
  }
}
