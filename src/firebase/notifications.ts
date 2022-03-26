import {
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { NotificationData } from '../store/reducers/modal/app.modal';
import { getNotificationsRef } from './ref';

export const getNotifications = async (userId: string): Promise<any> => {
  const notificationsRef = getNotificationsRef(userId);
  const notificationDocs = (
    await getDocs(query(notificationsRef, orderBy('Timestamp', 'desc')))
  ).docs;

  let notifications: NotificationData[] = [];
  notificationDocs.forEach((doc) => {
    const data = doc.data();
    notifications.push({
      id: data.ID,
      body: data.Body,
      title: data.Title,
      category: data.Category,
      timestamp: data.Timestamp.seconds,
    });
  });

  return notifications;
};

export const deleteNotification = (userId: string, notificationId: string) => {
  const notificationsRef = getNotificationsRef(userId);
  deleteDoc(doc(notificationsRef, notificationId));
};

export const unsubscribeNotificationCallback = (
  userId: string,
  setNotificationsList: Function,
) => {
  const notificationsRef = getNotificationsRef(userId);

  const queryResponse = query(notificationsRef, orderBy('Timestamp', 'desc'));

  const unsubscribe = onSnapshot(queryResponse, (querySnapshot: any) => {
    setNotificationsList(
      querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          id: data.ID,
          body: data.Body,
          title: data.Title,
          category: data.Category,
          timestamp: data.Timestamp.seconds,
        };
      }),
    );
  });

  return () => unsubscribe();
};
