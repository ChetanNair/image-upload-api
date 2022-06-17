import { Request, Response, NextFunction } from "express";
import {
  fetchAllImages,
  uploadImage,
  editImage,
  toggleFav,
  getCount,
  getImage,
} from "../services/image-services";

//Imagecontroller class with methods that correspond to various endpoints
class _imageController {
  //Counts the number of records in the database.
  getCount = async (req: Request, res: Response, next: NextFunction) => {
    const count = await getCount();
    return res.send(count);
  };

  //Counts the number of records in the database.
  getImage = async (req: Request, res: Response, next: NextFunction) => {
    const { uid } = req.body;
    const image = await getImage(uid);
    console.log(image);
    return res.send(image);
  };

  //Displays all images on the database
  showAll = async (req: Request, res: Response, next: NextFunction) => {
    const { cursor, favourite, name } = req.body;
    const images = await fetchAllImages(cursor, favourite, name);
    console.log(images);
    return res.send(images);
  };

  //Allows client to upload a single image
  uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    const { name, favourite } = req.body;
    const image = await uploadImage(name, favourite, file);
    return res.send(image);
  };

  //Allows client to edit image name
  editImage = async (req: Request, res: Response, next: NextFunction) => {
    const { uid, data } = req.body;
    const image = await editImage(uid, data);
    return res.send(image);
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
