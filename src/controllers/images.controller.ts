import { Request, Response } from "express";

class ImagesController {
  getImage(req: Request, res: Response) {
    //to be defined
    res.send("hello");
  }
  uploadImage(req: Request, res: Response) {
    //to be defined
    res.send("hello");
  }
}

export default new ImagesController();
