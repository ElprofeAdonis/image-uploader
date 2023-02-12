import { Request, Response } from "express";

class ImagesController {
  uploadImage(req: Request, res: Response) {
    //to be defined
    console.log("Saving phono");
    console.log(req.body);
    return res.json({
      message: "Photo SUCCESSFULLY saved",
    });
  }

  getImage(req: Request, res: Response) {
    //to be defined
    res.send("hello id de imagen");
  }
}

export default new ImagesController();
