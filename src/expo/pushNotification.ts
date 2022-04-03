import { Platform } from 'react-native';
import { isDevice } from 'expo-device';
import * as Notifications from 'expo-notifications';
import { updateUserData } from '../firebase/user';

export const registerForPushNotificationsAsync = async (
  userId: string,
): Promise<string> => {
  if (!isDevice) {
    console.log('Must use physical device for Push Notifications');
    return '';
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return '';
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  await updateUserData(userId, { expoToken: token });

  return token;
};
