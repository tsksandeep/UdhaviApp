import {
  setDoc,
  getDocs,
  query,
  doc,
  where,
  orderBy,
} from 'firebase/firestore';

import { RequestData } from './model';
import { requestsRef } from './ref';

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
    assignedVolunteers: requestData.assignedVolunteers,
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
