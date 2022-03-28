import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { uploadChatFile } from '../firebase/chat';

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

export const pickFileAsync = async (
  onSend: Function,
  setTransferring: Function,
  setTransferred: Function,
) => {
  const result = await DocumentPicker.getDocumentAsync();
  if (result.type === 'cancel') {
    return;
  }

  await uploadChatFile(
    'AU7xdWTe0CBEnPoTGy1c',
    result.uri,
    setTransferring,
    setTransferred,
  );
  onSend([{ image: result.uri }]);
};

export const pickImageAsync = async (
  onSend: Function,
  setTransferring: Function,
  setTransferred: Function,
) => {
  const response = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!response.granted) {
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync();
  if (result.cancelled) {
    return;
  }

  await uploadChatFile(
    'AU7xdWTe0CBEnPoTGy1c',
    result.uri,
    setTransferring,
    setTransferred,
  );
  onSend([{ image: result.uri }]);
};

export const takePictureAsync = async (
  onSend: Function,
  setTransferring: Function,
  setTransferred: Function,
) => {
  const response = await ImagePicker.requestCameraPermissionsAsync();
  if (!response.granted) {
    return;
  }

  const result = await ImagePicker.launchCameraAsync();
  if (result.cancelled) {
    return;
  }

  await uploadChatFile(
    'AU7xdWTe0CBEnPoTGy1c',
    result.uri,
    setTransferring,
    setTransferred,
  );
  onSend([{ image: result.uri }]);
};
