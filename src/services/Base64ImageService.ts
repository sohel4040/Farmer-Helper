import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const compressImage = async (imageUri: string) => {
  const result = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 800 } }], // Resize for smaller dimensions
    { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
  );
  return result.uri;
};

export const getBase64 = async (imageUri: string) => {
  try {
    const uri = await compressImage(imageUri);
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error("Error converting to base64:", error);
    return null;
  }
};
