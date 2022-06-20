import prisma from "../config/prisma";
import supabase from "../config/supabase";
import fs from "fs";

class imageModel {
  //Return the number of records in the database
  static async getCount() {
    const count = await prisma.images.count();
    return count;
  }

  //Returns a single image using its unique identifier
  static async getImage(uid: number) {
    //Checks if image exists on the database
    const image = await prisma.images.findUnique({
      where: {
        id: uid,
      },
    });

    //If image does exist on the database, return the url from storage
    if (image) {
      const { publicURL, error } = supabase.storage
        .from("images")
        .getPublicUrl(`/pictures/${image.id}`);
      return publicURL;
    } else {
      return {};
    }
  }

  //Returns all images on the database
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

    //Returns the URLs of all the images so that they can be displayed on the frontend.
    const urls: any = {};
    images.forEach(async (image) => {
      const { publicURL, error } = supabase.storage
        .from("images")
        .getPublicUrl(`/pictures/${image.id}`);
      urls[image.id] = publicURL;
    });
    return urls;
  }

  //Upload a single image to the database
  static async uploadImage(
    name: string,
    favourite: string,
    file?: Express.Multer.File
  ) {
    if (file) {
      //Create a database entry for the image
      const image = await prisma.images.create({
        data: {
          favourite: favourite == "true",
          name: name,
        },
      });

      //Upload the image from the temp folder to the supabase bucket
      const picture = fs.readFileSync(`./temp/${file.originalname}`);

      //Delete the image from the temp folder
      fs.unlink(`./temp/${file.originalname}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
      const filepath = `/pictures/${image.id}`;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filepath, picture);
      console.log(data, error);
      return image;
    }
    return {};
  }

  //Edits the details of an existing image on the database and returns an object from the query result
  static async editImageName(uid: number, data: JSON) {
    const editedImage = await prisma.images.update({
      where: {
        id: uid,
      },
      data: data,
    });
    return editedImage;
  }

  //Toggles whether an image is favourited or not and returns the new image object from the query result
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
