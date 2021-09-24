import { Dimensions, Image } from "react-native";

export const validateEmail = (text) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (regex.test(text) === false) {
    return false;
  }
  return true;
};

// Simple Timeout on a Promise: to remove later
export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// Not working yet: in progress - backlog °(-_-)°
export async function getImageSize(imgUrl) {
  let width = 0;
  let height = 0;
  await Image.getSize(imgUrl, (width, height) => {
    // calculate image width and height
    const screenWidth = Dimensions.get("window").width;
    const scaleFactor = width / screenWidth;
    const imageHeight = height / scaleFactor;
    width = screenWidth;
    height = imageHeight;
  });
  return { width: width, height: height };
}
