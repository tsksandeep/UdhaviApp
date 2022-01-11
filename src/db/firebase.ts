import { ref, set, get, child } from "firebase/database";
import {
  RequestExistsError,
  UserExistsError,
  UserNotExistsError,
} from "../errors/errors";

import { FirebaseDB } from "./config";

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

const getHash = (str: string) => {
  return [].reduce.call(
    str,
    function (hash: any, i: any) {
      var chr = i.charCodeAt(0);
      hash = (hash << 5) - hash + chr;
      return hash | 0;
    },
    0
  );
};

const dbRef = ref(FirebaseDB);

export const writeUserData = async (userData: UserData): Promise<any> => {
  const snapshot = await get(child(dbRef, `users/${userData.userId}`));
  if (snapshot.exists()) {
    return new UserExistsError(`user ${userData.userId} already exists`);
  }

  await set(ref(FirebaseDB, `users/${userData.userId}`), {
    name: userData.name,
    phoneNumber: userData.phoneNumber,
  });

  return null;
};

export const readUserData = async (userId: string): Promise<any> => {
  const snapshot = await get(child(dbRef, `users/${userId}`));
  if (
    !snapshot.exists() ||
    !snapshot?.val()?.name ||
    !snapshot?.val()?.phoneNumber
  ) {
    return new UserNotExistsError(`user ${userId} does not exists`);
  }

  return {
    userId: userId,
    name: snapshot.val().name,
    phoneNumber: snapshot.val().phoneNumber,
  };
};

export const writeRequestData = async (
  requestData: RequestData
): Promise<any> => {
  const id = getHash(
    requestData.name +
      requestData.phoneNumber +
      requestData.info +
      requestData.location +
      requestData.deliveryTime +
      requestData.notes
  );

  const snapshot = await get(child(dbRef, `requests/${id}`));
  if (snapshot.exists()) {
    return new RequestExistsError(`request ${id} already exists`);
  }

  await set(ref(FirebaseDB, `requests/${id}`), {
    name: requestData.name,
    phoneNumber: requestData.phoneNumber,
    info: requestData.info,
    location: requestData.location,
    deliveryTime: requestData.deliveryTime,
    notes: requestData.notes,
  });

  return null;
};
