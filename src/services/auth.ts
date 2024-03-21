import { IBodyPayload, IUserDetails } from "../lib/types/loginTypes";
import { AuthModel } from "../models/auth";
import jwt from "jsonwebtoken";

export class AuthService {
  async signin(body: IBodyPayload) {}

  async getUserByEmail(email: string) {
    return await AuthModel.find({ email: email });
  }
  async getUserByUsername(username: string) {
    return await AuthModel.find({ username: username });
  }
  async getAllUsers() {
    return await AuthModel.find({});
  }

  async signUp(body: any) {
    return await AuthModel.create(body);
  }

  async generateJWT(user: IUserDetails) {
    try {
      // Generate access token
      const accessToken = jwt.sign({ userId: user._id }, "accessTokenSecret", {
        expiresIn: "7d",
      });

      // Generate refresh token
      const refreshToken = jwt.sign({ userId: user._id }, "accessTokenSecret", {
        expiresIn: "90d",
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error("Error generating JWT");
    }
  }
}
