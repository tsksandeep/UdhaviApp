import { collection } from 'firebase/firestore';
import { FirebaseDB } from './config';

export const usersRef = collection(FirebaseDB, 'users');
export const chatsRef = collection(FirebaseDB, 'chats');
export const requestsRef = collection(FirebaseDB, 'requests');
export const volunteersRef = collection(FirebaseDB, 'volunteers');

export const getNotificationsRef = (userId: string) => {
  return collection(FirebaseDB, `notifications/${userId}/list`);
};

export const getMessagesRef = (groupId: string) => {
  return collection(FirebaseDB, `chats/${groupId}/messages`);
};
