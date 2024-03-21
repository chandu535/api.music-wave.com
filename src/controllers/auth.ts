import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth";
import {
  signInWithEmailSchema,
  signInWithUsernameSchema,
  signUpSchema,
} from "../lib/validators/signUpSchema";
import bcrypt from "bcrypt";
import { IUserDetails } from "../lib/types/loginTypes";

const authService: AuthService = new AuthService();
export class AuthController {
  async comparePassword(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
      throw new Error("Error comparing passwords");
    }
  }

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

      return res.status(201).json({
        status: 201,
        message: "User registered successfully",
        user: userData,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async signinController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req;
      const { email_or_username, password } = body;
      let validateResponse;
      if (email_or_username?.includes("@"))
        validateResponse = signInWithEmailSchema.validate(body, {
          abortEarly: false,
        });
      else {
        validateResponse = signInWithUsernameSchema.validate(body, {
          abortEarly: false,
        });
      }
      let { error, value } = validateResponse;
      if (error) {
        const errorMessages = error.details.map((detail) => ({
          message: detail.message.replace(/"/g, ""), // Remove double quotes from error messages
          path: detail.path.join("."),
          type: detail.type,
        }));
        return res.status(400).json({ error: { details: errorMessages } });
      }

      let user: IUserDetails[] | any;
      if (email_or_username.includes("@")) {
        user = await authService.getUserByEmail(email_or_username);
      } else {
        user = await authService.getUserByUsername(email_or_username);
      }


      if (!(user && user?.length)) {
        return res.status(401).json({
          success: false,
          message: "Invalid Credentials",
        });
      }

      if (!(user && user.length)) {
        return res.status(401).json({
          success: false,
          message: "Invalid Credentials",
        });
      }

      let isAuthenticated = await bcrypt.compare(password, user[0].password);

      if (!isAuthenticated) {
        return res.status(401).json({
          success: false,
          message: "Invalid Credentials",
        });
      }
      const { accessToken, refreshToken } = await authService.generateJWT(
        user[0]
      );

      const data = {
        access_token: accessToken,
        refresh_token: refreshToken,
        user_details: user[0],
      };
      return res
        .status(200)
        .json({ status: 200, message: "Signed in successfully", data });
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
