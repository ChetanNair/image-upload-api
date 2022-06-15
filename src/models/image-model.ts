import prisma from "../config/prisma";

class imageModel {
    static async getImages() {
        const images = await prisma.images.findMany();
        console.log(images);
        return images;
    }
}


export { imageModel };