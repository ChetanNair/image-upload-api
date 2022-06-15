import multer from "multer";

//Define where to store the images and how to name the file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp");
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

//Only allow specific filetypes when uploading
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};

export { storage, fileFilter };
