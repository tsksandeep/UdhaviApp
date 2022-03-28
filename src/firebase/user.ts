import { UserExistsError, UserNotExistsError } from '../errors/errors';

import { UserData } from './model';
import { usersRef } from './ref';

export const writeUserData = async (userData: UserData): Promise<any> => {
  const docSnapshot = await usersRef.doc(userData.userId).get();
  if (docSnapshot.exists) {
    return new UserExistsError(`user ${userData.userId} already exists`);
  }

  await usersRef.doc(userData.userId).set({
    name: userData.name,
    phoneNumber: userData.phoneNumber,
    expoToken: userData.expoToken ? userData.expoToken : '',
  });

  return null;
};

export const readUserData = async (
  userId: string,
): Promise<UserData | UserNotExistsError> => {
  const docSnapshot = await usersRef.doc(userId).get();
  const user = docSnapshot.data();
  if (!docSnapshot.exists || !user?.name || !user?.phoneNumber) {
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
  await usersRef.doc(id).update(data);
};
