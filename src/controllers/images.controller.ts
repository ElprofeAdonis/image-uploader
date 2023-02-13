import { Request, Response } from "express";
import { createImage, getImage } from "../services/image.service";
import { v4 as uuidv4 } from "uuid";

export async function uploadImage(req: Request, res: Response) {
  // const userId = req.user.id;
  const { titulo, descripcion } = req.body;
  const imagePath = req.file?.path || "";
  const uuid = uuidv4();

  // const userId = req.user.id;

  await createImage(uuid, titulo, descripcion, imagePath);

  return res.json({
    uuid,
    message: "Image successfully saved",
    imagePath,
    data: req.file,
  });
}
const imageController = {
  uploadImage,
};

export function getImages(req: Request, res: Response) {
  res.send("hello id de imagen");
}

export async function getImageById(req: Request, res: Response) {
  const { uuid } = req.params;
  const image = await getImage(uuid);
  res.json(image);
}

export default imageController;
