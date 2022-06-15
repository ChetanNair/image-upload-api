import { Multer } from "multer";
import prisma from "../config/prisma";
import supabase from "../config/supabase";

class imageModel {
  //Gets all images on the database
  static async getImages() {
    const images = await prisma.images.findMany();

    return images;
  }

  //Uploads a single image to the database
  static async uploadImage(
    name: string,
    link: string,
    favourite: string,
    file?: Express.Multer.File
  ) {
    const image = await prisma.images.create({
      data: {
        link: link,
        favourite: favourite == "true",
        name: name,
      },
    });

    //Upload buffer data to database
    if (file) {
      const filepath = `/pictures/${image.id}`;
      console.log(filepath);
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filepath, file.buffer);
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
  static async toggleFav(uid: number) {
    const image = await prisma.images.findUnique({
      where: {
        id: uid,
      },
    });
    const toggledImage = await prisma.images.update({
      where: {
        id: uid,
      },
      data: {
        favourite: !image?.favourite,
      },
    });
    return toggledImage;
  }
}

export { imageModel };
