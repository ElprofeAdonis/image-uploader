import { Router } from "express";
import multer from "../libs/multer";

import {
  uploadImage,
  getImages,
  getImageById,
} from "../controllers/images.controller";

const router = Router();

//Definition of every endpoint from source
router
  .route("/photos")
  .post(multer.single("image"), uploadImage)
  .get(getImages);
router.route("/photo/:uuid").get(getImageById);

export default router;
