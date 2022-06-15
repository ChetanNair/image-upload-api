import { Request, Response, Router } from 'express';
import { imageController } from "../controllers/image-controller";

const imageRouter = Router();

//Connecting up routes to controller methods
imageRouter.get('/', imageController.showAll);
imageRouter.get('/upload', imageController.uploadImage);
imageRouter.get('/fav', imageController.toggleFavourite);
imageRouter.get('/edit', imageController.editImage);


export default imageRouter;