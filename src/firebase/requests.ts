import {
  setDoc,
  getDocs,
  query,
  doc,
  where,
  orderBy,
  getDoc,
} from 'firebase/firestore';

import { RequestNotExistsError } from '../errors/errors';
import { RequestData } from './model';
import { requestsRef } from './ref';

export const assignVolunteersToRequest = (
  requestId: string,
  volunteerIds: Array<string>,
) => {
  const request = updateRequestWithNewVolunteers(requestId, volunteerIds);
  if (!request) {
    return;
  }

  // Update action with new volunteer data
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
    assignedVolunteerIds: requestData.assignedVolunteerIds,
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

export const getRequestByID = async (id: string): Promise<any> => {
  const docSnapshot = await getDoc(doc(requestsRef, id));
  const request = docSnapshot.data();
  if (!docSnapshot.exists() || !request?.name || !request?.phoneNumber) {
    return new RequestNotExistsError(`request ${id} does not exists`);
  }

  return {
    userId: id,
    name: request.name,
    phoneNumber: request.phoneNumber,
    info: request.info,
    location: request.location,
    deliveryTime: request.deliveryTime,
    notes: request.notes,
    date: request.date,
    assignedVolunteerIds: request.assignedVolunteerIds,
  };
};

export const updateRequestWithNewVolunteers = async (
  requestId: string,
  volunteerIds: Array<string>,
): Promise<RequestData | null> => {
  var request = await getRequestByID(requestId);
  if (request instanceof RequestNotExistsError) {
    return null;
  }

  volunteerIds.forEach((id: string) => {
    if (!request.assignedVolunteerIds.includes(id)) {
      request.assignedVolunteerIds.push(id);
    }
  });

  await writeRequestData(request);
  return request;
};
