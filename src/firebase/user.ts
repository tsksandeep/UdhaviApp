import { setDoc, getDoc, doc, updateDoc } from 'firebase/firestore';
import { UserExistsError, UserNotExistsError } from '../errors/errors';

import { UserData } from './model';
import { usersRef } from './ref';

export const writeUserData = async (userData: UserData): Promise<any> => {
  const docSnapshot = await getDoc(doc(usersRef, userData.userId));
  if (docSnapshot.exists()) {
    return new UserExistsError(`user ${userData.userId} already exists`);
  }

  await setDoc(doc(usersRef, userData.userId), {
    name: userData.name,
    phoneNumber: userData.phoneNumber,
    expoToken: userData.expoToken,
  });

  return null;
};

export const readUserData = async (
  userId: string,
): Promise<UserData | UserNotExistsError> => {
  const docSnapshot = await getDoc(doc(usersRef, userId));
  const user = docSnapshot.data();
  if (!docSnapshot.exists() || !user?.name || !user?.phoneNumber) {
    return new UserNotExistsError(`user ${userId} does not exists`);
  }

  return {
    userId: userId,
    name: user.name,
    phoneNumber: user.phoneNumber,
    expoToken: user.expoToken,
  };
};

export const updateUserData = async (
  id: string,
  data: { [key: string]: any },
) => {
  await updateDoc(doc(usersRef, id), data);
};
