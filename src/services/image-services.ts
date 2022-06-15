import { imageModel } from "../models/image-model";

const fetchAllImages = async () => {
  const images = await imageModel.getImages();
  return images;
};

const uploadImage = async (
  name: string,
  link: string,
  favourite: string,
  file?: Express.Multer.File
) => {
  const image = await imageModel.uploadImage(name, link, favourite, file);
  return image;
};

const editImage = async (uid: number, data: JSON) => {
  const image = await imageModel.editImageName(uid, data);
  return image;
};

const toggleFav = async (uid: number) => {
  const image = await imageModel.toggleFav(uid);
  return image;
};

export { fetchAllImages, uploadImage, editImage, toggleFav };
