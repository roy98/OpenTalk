import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export async function requestMediaLibraryPermission() {
  (async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== ImagePicker.PermissionStatus.GRANTED) {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  })();
}

export async function requestCameraPermission() {
  (async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== ImagePicker.PermissionStatus.GRANTED) {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  })();
}

export async function launchImageLibrary() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    aspect: [4, 3],
    base64: true,
  });

  if (Platform.OS === "android") {
    ImagePicker.getPendingResultAsync()
      .then((value) => {
        return value[0];
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!result.cancelled) {
    return result;
  }
}

export async function launchCamera() {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    aspect: [4, 3],
    base64: true,
  });

  if (Platform.OS === "android") {
    ImagePicker.getPendingResultAsync()
      .then((value) => {
        return value[0];
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!result.cancelled) {
    return result;
  }
}

export async function hasCameraPermission() {
  let result = await ImagePicker.getCameraPermissionsAsync();

  if (result.granted) {
    return true;
  }

  return false;
}

export async function hasMediaLibraryPermission() {
  let result = await ImagePicker.getMediaLibraryPermissionsAsync();

  if (result.granted) {
    return true;
  }

  return false;
}
