import { Request, Response, Router } from 'express';
import { imageController } from "../controllers/image-controller";

const imageRouter = Router();

//Connecting up routes to controller methods
imageRouter.get('/', imageController.showAll);
imageRouter.post('/upload', imageController.uploadImage);
imageRouter.post('/fav', imageController.toggleFavourite);
imageRouter.put('/edit', imageController.editImage);


export default imageRouter;