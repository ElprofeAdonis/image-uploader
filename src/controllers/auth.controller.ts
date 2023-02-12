import { Request, Response } from "express";
import { LoginSchema, RegisterUserSchema } from "../models/auth.model";
import authService from "../services/auth.service";
import { BaseController } from "../types/base.controller";

class AuthController extends BaseController {
  async register(req: Request, res: Response) {
    try {
      const data = await RegisterUserSchema.validateAsync(req.body);
      const result = await authService.register({
        updatedAt: new Date(),
        ...data,
      });
      this.responseHandler(
        res,
        {
          message: `Welcome ${result.username}! user successfully stored in database`,
        },
        200
      );
    } catch (error: any) {
      if (error.code && error.code === "P2002") {
        this.responseHandler(
          res,
          { error: "The typed user already exists in the database" },
          400
        );
      } else {
        this.errorHandler(res, error);
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = await LoginSchema.validateAsync(req.body);
      const result = await authService.login(data.email, data.password);

      this.responseHandler(res, result, 200);
    } catch (error: any) {
      this.errorHandler(res, error);
    }
  }
}

export default new AuthController();
