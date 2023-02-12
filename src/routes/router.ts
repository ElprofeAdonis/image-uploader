import { Application } from "express";
import imagesRouter from "./images";
import authRouter from "./auth";
export default function router(app: Application): void {
  /**
   * Every source are specifed here
   */
  app.use("/auth", authRouter);
  app.use("/image", imagesRouter);
}
