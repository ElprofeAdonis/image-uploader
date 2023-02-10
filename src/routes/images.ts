import { Router } from "express";
import imagesController from "../controllers/images.controller";
//Definition of every endpoint from source
export default Router()
  .get("/:id", (req, res) => imagesController.getImage(req, res))
  .post("/", (req, res) => imagesController.uploadImage(req, res));
