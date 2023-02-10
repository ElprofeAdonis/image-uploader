import { Request, Response } from "express";
import { RegisterUserSchema } from "../models/auth.model";
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
        { message: `User ${result.name} created successfully` },
        200
      );
    } catch (error: any) {
      if (error.code && error.code === "P2002") {
        this.responseHandler(res, { error: "User was already register" }, 400);
      } else {
        this.errorHandler(res, error);
      }
    }
  }
  public login(req: Request, res: Response) {
    res.send("Hello World! Adonis ");
  }
}

export default new AuthController();
