import { IBodyPayload } from "../lib/types/loginTypes";
import { AuthModel } from "../models/auth";

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
}
