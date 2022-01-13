import { collection, setDoc, getDoc, doc } from "firebase/firestore";
import {
  RequestExistsError,
  UserExistsError,
  UserNotExistsError,
} from "../errors/errors";

import { FirebaseDB } from "./config";
import { generateHash } from "../helpers/hash";

export interface UserData {
  userId: string;
  name?: string;
  phoneNumber?: string;
}

export interface RequestData {
  name: string;
  phoneNumber: string;
  info: string;
  location: string;
  deliveryTime: string;
  notes: string;
}

const usersRef = collection(FirebaseDB, "users");
const requestsRef = collection(FirebaseDB, "requests");

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

export const writeRequestData = async (
  requestData: RequestData
): Promise<any> => {
  const id = generateHash(
    requestData.name +
      requestData.phoneNumber +
      requestData.info +
      requestData.location +
      requestData.deliveryTime +
      requestData.notes
  );

  const docSnapshot = await getDoc(doc(requestsRef, id.toString()));
  if (docSnapshot.exists()) {
    return new RequestExistsError(`request ${id} already exists`);
  }

  await setDoc(doc(requestsRef, id.toString()), {
    name: requestData.name,
    phoneNumber: requestData.phoneNumber,
    info: requestData.info,
    location: requestData.location,
    deliveryTime: requestData.deliveryTime,
    notes: requestData.notes,
  });

  return null;
};
