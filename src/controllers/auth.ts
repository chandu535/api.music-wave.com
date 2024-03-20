import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth";
import { signUpSchema } from "../lib/validators/signUpSchema";
import bcrypt from "bcrypt";

const authService: AuthService = new AuthService();
export class AuthController {
  async hashPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      return password;
      throw new Error("Error hashing password");
    }
  }

  async signUpUser(req: Request, res: Response) {
    let { body } = req;

    const { error, value } = signUpSchema.validate(body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => ({
        message: detail.message.replace(/"/g, ""), // Remove double quotes from error messages
        path: detail.path.join("."),
        type: detail.type,
      }));
      return res.status(400).json({ error: { details: errorMessages } });
    }

    let userByEmail = await authService.getUserByEmail(body.email);
    let userByUserName = await authService.getUserByUsername(body.username);

    if (userByEmail && userByEmail.length) {
      return res.status(409).json({
        message: "User with this email already exists",
        status: 409,
        success: false,
        data: userByEmail,
      });
    }

    if (userByUserName && userByUserName.length) {
      return res.status(409).json({
        message: "User with this username already exists",
        status: 409,
        success: false,
        data: userByUserName,
      });
    }

    try {
      let bcryptPassword = await bcrypt.hash(body.password, 10);

      let reqBody = {
        ...body,
        password: bcryptPassword,
      };
      let userData = await authService.signUp(reqBody);

      return res.status(200).json({
        message: "User registered successfully",
        user: userData,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async signinWithEmailOrPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req;
      const response = await authService.signin(body);
      return res.status(200).json(response);
    } catch (err) {
      console.log({ err });
    }
  }

  public async getAllUserController(req: Request, res: Response) {
    try {
      let response = await authService.getAllUsers();
      res
        .status(200)
        .json({ message: "Users fetched successfully", data: response });
    } catch (err) {
      console.log({ err });
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
