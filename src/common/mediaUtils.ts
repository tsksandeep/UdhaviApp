import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

export const getLocationAsync = async (onSend: any) => {
  const response = await Location.requestForegroundPermissionsAsync();
  if (!response.granted) {
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  if (location) {
    onSend([{ location: location.coords }]);
  }
};

export const pickImageAsync = async (onSend: any) => {
  const response = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!response.granted) {
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (!result.cancelled) {
    onSend([{ image: result.uri }]);
    return result.uri;
  }
};

export const takePictureAsync = async (onSend: any) => {
  const response = await ImagePicker.requestCameraPermissionsAsync();
  if (!response.granted) {
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (!result.cancelled) {
    onSend([{ image: result.uri }]);
    return result.uri;
  }
};
