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
  //Returns the number of records in the database.
  getCount = async (req: Request, res: Response, next: NextFunction) => {
    const count = await getCount();
    return res.send(count);
  };

  //Returns a single image object from the database.
  getImage = async (req: Request, res: Response, next: NextFunction) => {
    const { uid } = req.body;
    const image = await getImage(uid);
    return res.send(image);
  };

  //Displays all images on the database
  showAll = async (req: Request, res: Response, next: NextFunction) => {
    const { cursor } = req.params;
    const { favourite, name } = req.query;

    //Make sure fav is of type boolean or undefined
    var fav: any;
    if (favourite) {
      fav = favourite == "true";
    } else {
      fav = favourite;
    }

    //Make sure newname is of type string
    let newname = <string>name;
    console.log(newname);
    const cursorInt: number = +cursor;
    const images = await fetchAllImages(cursorInt, fav, newname);
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

  //Allows client to toggle whether an image is favourited or not
  toggleFav = async (req: Request, res: Response, next: NextFunction) => {
    const { uid, currentState } = req.body;
    const toggledImage = await toggleFav(uid, currentState);
    return res.send(toggledImage);
  };
}

const imageController = new _imageController();
export { imageController };
