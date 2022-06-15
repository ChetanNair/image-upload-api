import prisma from "../config/prisma";

class imageModel {
  //Gets all images on the database
  static async getImages() {
    const images = await prisma.images.findMany();
    return images;
  }

  //Uploads a single image to the database
  static async uploadImage(name: string, link: string, favourite: boolean) {
    const image = await prisma.images.create({
      data: {
        link: link,
        favourite: favourite,
        name: name,
      },
    });
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
