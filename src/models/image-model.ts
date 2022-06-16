import prisma from "../config/prisma";
import supabase from "../config/supabase";
import fs from "fs";
import { fileFilter } from "src/config/multer";
import { builtinModules } from "module";

class imageModel {
  //Get number of records in the database
  static async getCount() {
    const count = await prisma.images.count();
    return count;
  }

  //Gets all images on the database
  //Cursor allows for pagination
  static async getImages(cursor?: number, favourite?: boolean, name?: string) {
    if (!cursor) {
      //   Default value in case a cursor is not passed in by the frontend. This will need to be tuned
      //   once the frontend is built
      cursor = 0;
    }
    const images = await prisma.images.findMany({
      take: 4,
      skip: 1,
      cursor: {
        id: cursor,
      },
      where: {
        favourite: {
          equals: favourite,
        },
        name: {
          equals: name,
        },
      },

      orderBy: {
        id: "asc",
      },
    });
    return images;
  }

  //Uploads a single image
  static async uploadImage(
    name: string,
    favourite: string,
    file?: Express.Multer.File
  ) {
    //First create a database entry for the image
    const image = await prisma.images.create({
      data: {
        favourite: favourite == "true",
        name: name,
      },
    });

    //Upload the image from the temp folder to the supabase bucket
    if (file) {
      const extension = file.mimetype.split("/")[1];
      const picture = fs.readFileSync(`./temp/${file.originalname}`);
      const filepath = `/pictures/${image.id}.${extension}`;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filepath, picture);
      console.log(data, error);
    }
    return image;
  }

  //Edits the details of an existing image on the database
  static async editImageName(uid: number, data: JSON) {
    const editedImage = await prisma.images.update({
      where: {
        id: uid,
      },
      data: data,
    });
    return editedImage;
  }

  //Toggles whether an image is favourited or not
  static async toggleFav(uid: number, currentState: boolean) {
    const toggledImage = await prisma.images.update({
      where: {
        id: uid,
      },
      data: {
        favourite: !currentState,
      },
    });
    return toggledImage;
  }
}

export { imageModel };
