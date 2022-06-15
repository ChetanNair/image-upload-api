import { imageModel } from "../models/image-model";

const fetchAllImages = async () => {
    const images = await imageModel.getImages();
    return images;
};

const uploadImage = async (link: string, favourite: boolean) => {
    const image = await imageModel.uploadImage(link, favourite);
    return image;
}

const editImage = async (uid: number, newLink: string) => {
    const image = await imageModel.editImage(uid, newLink);
    return image;
}

const toggleFav = async (uid: number) => {
    const image = await imageModel.toggleFav(uid);
    return image;
}

export { fetchAllImages, uploadImage, editImage, toggleFav };