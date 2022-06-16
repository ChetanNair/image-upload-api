import { Request, Response, NextFunction } from "express";
import {
  fetchAllImages,
  uploadImage,
  editImage,
  toggleFav,
  getCount,
} from "../services/image-services";

//Imagecontroller class with methods that correspond to various endpoints
class _imageController {
  //Counts the number of records in the database.
  getCount = async (req: Request, res: Response, next: NextFunction) => {
    const count = await getCount();
    return res.send(`${count}`);
  };

  //Displays all images on the database
  showAll = async (req: Request, res: Response, next: NextFunction) => {
    const { cursor, favourite, name } = req.body;
    const images = await fetchAllImages(cursor, favourite, name);
    console.log(images);
    return res.send("Successful retrieval!" + images);
  };

  //Allows client to upload a single image
  uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    const { name, favourite } = req.body;
    const image = await uploadImage(name, favourite, file);
    return res.send("Uploaded the image successfully!");
  };

  //Allows client to edit image name and/or link
  editImage = async (req: Request, res: Response, next: NextFunction) => {
    const { uid, data } = req.body;
    const image = await editImage(uid, data);
    return res.send("Image name has been edited!");
  };

  //Allows client to toggle whether
  toggleFav = async (req: Request, res: Response, next: NextFunction) => {
    const { uid, currentState } = req.body;
    const toggledImage = await toggleFav(uid, currentState);
    return res.send("Favourite has been toggled");
  };
}

const imageController = new _imageController();
export { imageController };
