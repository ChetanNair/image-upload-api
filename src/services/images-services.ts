import { imageModel } from "../models/image-model";

const fetchAllImages = async () => {
    const images = await imageModel.getImages();
    return images;
};

export { fetchAllImages };