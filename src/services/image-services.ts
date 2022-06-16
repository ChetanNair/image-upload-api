import { imageModel } from "../models/image-model";

const fetchAllImages = async (
  cursor?: number,
  favourite?: boolean,
  name?: string
) => {
  const images = await imageModel.getImages(cursor, favourite, name);
  return images;
};

const uploadImage = async (
  name: string,
  favourite: string,
  file?: Express.Multer.File
) => {
  const image = await imageModel.uploadImage(name, favourite, file);
  return image;
};

const editImage = async (uid: number, data: JSON) => {
  const image = await imageModel.editImageName(uid, data);
  return image;
};

const toggleFav = async (uid: number, currentState: boolean) => {
  const image = await imageModel.toggleFav(uid, currentState);
  return image;
};

const getCount = async () => {
  const count = await imageModel.getCount();
  return count;
};

export { fetchAllImages, uploadImage, editImage, toggleFav, getCount };
