import { FirebaseDB, FirebaseStorage } from './config';

export const usersRef = FirebaseDB.collection('users');
export const chatsRef = FirebaseDB.collection('chats');
export const requestsRef = FirebaseDB.collection('requests');
export const volunteersRef = FirebaseDB.collection('volunteers');
export const chatGroupsRef = FirebaseDB.collection(`chatGroups`);

export const getNotificationsRef = (userId: string) => {
  return FirebaseDB.collection(`notifications/${userId}/list`);
};

export const getMessagesRef = (groupId: string) => {
  return FirebaseDB.collection(`chats/${groupId}/messages`);
};

export const getChatStorageRef = (groupId: string, filename: string) => {
  return FirebaseStorage.ref(`chat/${groupId}/${filename}`);
};
