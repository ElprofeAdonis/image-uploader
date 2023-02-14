import { User } from "@prisma/client";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { HttpError } from "../types/custom.error";
import userService from "./user.service";
import * as jwt from "jsonwebtoken";
import { promisify } from "util";

class AutService {
  private hashPassword(password: string) {
    const saltRounds = genSaltSync(10);

    return hashSync(password, saltRounds);
  }

  private validatePassword(hash: string, password: string) {
    return compareSync(password, hash);
  }

  private async generateAccessToken(user: User) {
    try {
      const { EXPIRATION_TOKEN, SECRET } = process.env;
      const promise: (payload: any, key: string, options: any) => Promise<any> =
        promisify(jwt.sign).bind(jwt);
      const token = await promise(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
        },
        SECRET || "",
        {
          expiresIn: EXPIRATION_TOKEN || "1d",
        }
      );

      const verifyPromise: (
        token: string,
        key: string,
        options?: jwt.VerifyOptions
      ) => any = promisify(jwt.verify).bind(jwt);
      await verifyPromise(token, SECRET || "");

      console.log("Access aproved");
      return token;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while generating the access token");
    }
  }

  register(user: User) {
    const { password, ...rest } = user;
    return userService.createUser({
      password: this.hashPassword(password),
      ...rest,
    });
  }

  async login(email: string, password: string) {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new HttpError("User doesn't exist", 404);
    }
    if (!this.validatePassword(user.password, password)) {
      throw new HttpError("Password doesn't match", 401);
    }
    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }
}
export default new AutService();
