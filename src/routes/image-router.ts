import { Router } from "express";
import { imageController } from "../controllers/image-controller";
import multer from "multer";
import { storage, fileFilter } from "../config/multer";

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 }, //Adds a filesize limit of 1MB
});
const imageRouter = Router();

//Connecting up routes to controller methods
imageRouter.get("/count", imageController.getCount);
imageRouter.get("/getImage", imageController.getImage);
imageRouter.get("/:cursor", imageController.showAll);
imageRouter.post("/upload", upload.single("file"), imageController.uploadImage);
imageRouter.put("/fav", imageController.toggleFav);
imageRouter.put("/edit", imageController.editImage);

export default imageRouter;
