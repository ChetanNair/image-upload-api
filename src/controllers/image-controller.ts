import { Request, Response, NextFunction } from 'express';
import { fetchAllImages } from '../services/images-services'

//Imagecontroller class with methods that correspond to various endpoints
class _imageController {

    //Displays all images on the database
    showAll = async (req: Request, res: Response, next: NextFunction) => {
        const images = await fetchAllImages();
        return res.send("Successful retrieval!");
    }

    //Allows client to upload a single image of size 2MB
    uploadImage = async (req: Request, res: Response, next: NextFunction) => {
        return res.send("This is where you would upload an image");
    }

    //Allows client to edit image details
    editImage = async (req: Request, res: Response, next: NextFunction) => {
        return res.send("This is how you would edit the image");
    }

    //Allows client to toggle whether 
    toggleFavourite = async (req: Request, res: Response, next: NextFunction) => {
        return res.send("This is how you would toggle whether an image is favourited or not");
    }

} 

const imageController = new _imageController;
export { imageController };