import { getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { NotificationData } from '../store/reducers/modal/app.modal';
import { getNotificationsRef } from './ref';

export const getNotifications = async (userId: string): Promise<any> => {
  const notificationsRef = getNotificationsRef(userId);
  const notificationDocs = (await getDocs(query(notificationsRef))).docs;

  let notifications: NotificationData[] = [];
  notificationDocs.forEach((doc) => {
    let data = doc.data();
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
