import { Request, Response, NextFunction } from 'express';
import { fetchAllImages, uploadImage, editImage } from '../services/images-services'

//Imagecontroller class with methods that correspond to various endpoints
class _imageController {

    //Displays all images on the database
    showAll = async (req: Request, res: Response, next: NextFunction) => {
        const images = await fetchAllImages();
        return res.send("Successful retrieval!" + images);
    }

    //Allows client to upload a single image
    uploadImage = async (req: Request, res: Response, next: NextFunction) => {
        const { link, favourite } = req.body;
        const image = await uploadImage(link, favourite);
        return res.send("Uploaded the image successfully!");
    }

    //Allows client to edit image link
    editImage = async (req: Request, res: Response, next: NextFunction) => {
        const { uid, newLink } = req.body;
        const image = await editImage(uid, newLink);
        return res.send("Image has been edited!");
    }

    //Allows client to toggle whether 
    toggleFavourite = async (req: Request, res: Response, next: NextFunction) => {
        return res.send("This is how you would toggle whether an image is favourited or not");
    }

} 

const imageController = new _imageController;
export { imageController };