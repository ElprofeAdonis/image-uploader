import { Router } from "express";
import authController from "../controllers/auth.controller";
//Definition of every endpoint from source
export default Router()
  .post("/login", (req, res) => authController.login(req, res))
  .post("/register", (req, res) => authController.register(req, res));
