import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';

const imageRouter = Router();
const { CREATED, OK } = StatusCodes


//Show all images
imageRouter.get('/', async (req: Request, res: Response) => {
    //const images = await getAllImages();
    //return res.status(OK).json({images});
    return res.send("This should return all the images and display");
});

//Upload a single image
imageRouter.post('/upload', async (req: Request, res: Response) => {
    //const images = await getAllImages();
    //return res.status(OK).json({images});
    return res.send("This should upload an image");
});



export default imageRouter;