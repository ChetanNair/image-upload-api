import { PrismaClient } from "@prisma/client";
import prisma from "../config/prisma";

class imageModel {

    //Gets all images on the database
    static async getImages() {
        const images = await prisma.images.findMany();
        return images;
    }

    //Uploads a single image to the database
    static async uploadImage(link: string, favourite: boolean) {
        const image = await prisma.images.create({
            data: {
                link: link, 
                favourite: favourite
            }
        });
        return image;
    }

    //Edits the link to an existing image on the database
    static async editImage(uid: number, newLink: string) {
        const newImage = await prisma.images.update({
            where: {
                id: uid,
            },
            data: {
                link: newLink,
            },
        });
        const image = await prisma.images.findUnique({
            where: {
                id: uid,
            },
        });
        return image;



    }
}


export { imageModel };