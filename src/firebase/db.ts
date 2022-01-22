import {
  collection,
  setDoc,
  getDoc,
  getDocs,
  query,
  doc,
  where,
  orderBy,
} from 'firebase/firestore';
import { UserExistsError, UserNotExistsError } from '../errors/errors';

import { FirebaseDB } from './config';
import { RequestData, UserData } from './model';

const usersRef = collection(FirebaseDB, 'users');
const requestsRef = collection(FirebaseDB, 'requests');
const volunteersRef = collection(FirebaseDB, 'volunteers');

export const writeUserData = async (userData: UserData): Promise<any> => {
  const docSnapshot = await getDoc(doc(usersRef, userData.userId));
  if (docSnapshot.exists()) {
    return new UserExistsError(`user ${userData.userId} already exists`);
  }

  await setDoc(doc(usersRef, userData.userId), {
    name: userData.name,
    phoneNumber: userData.phoneNumber,
  });

  return null;
};

export const readUserData = async (userId: string): Promise<any> => {
  const docSnapshot = await getDoc(doc(usersRef, userId));
  const user = docSnapshot.data();
  if (!docSnapshot.exists() || !user?.name || !user?.phoneNumber) {
    return new UserNotExistsError(`user ${userId} does not exists`);
  }

  return {
    userId: userId,
    name: user.name,
    phoneNumber: user.phoneNumber,
  };
};

export const writeRequestData = async (requestData: RequestData) => {
  await setDoc(doc(requestsRef, requestData.id), {
    id: requestData.id,
    name: requestData.name,
    phoneNumber: requestData.phoneNumber,
    info: requestData.info,
    location: requestData.location,
    deliveryTime: requestData.deliveryTime,
    notes: requestData.notes,
    date: requestData.date,
  });
};

export const getAllRequests = async (): Promise<any> => {
  return (await getDocs(query(requestsRef, orderBy('date')))).docs;
};

export const getRequestsByPhoneNumber = async (
  phoneNumber: string,
): Promise<any> => {
  return (
    await getDocs(
      query(
        requestsRef,
        where('phoneNumber', '==', phoneNumber),
        orderBy('date'),
      ),
    )
  ).docs;
};

export const getAllVolunteers = async (): Promise<any> => {
  return (await getDocs(query(volunteersRef, orderBy('lastActive')))).docs;
};

export const getVolunteersByZone = async (zone: string): Promise<any> => {
  return (
    await getDocs(
      query(volunteersRef, where('zone', '==', zone), orderBy('lastActive')),
    )
  ).docs;
};
