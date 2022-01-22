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
import {
  addRequestToVolunteers,
  removeRequestFromVolunteers,
} from './volunteers';

export const assignVolunteersToRequest = (
  requestId: string,
  volunteerIds: Array<string>,
) => {
  const request = addVolunteersToRequest(requestId, volunteerIds);
  const volunteers = addRequestToVolunteers(requestId, volunteerIds);

  // actions.updateRequest(request)
  // actions.updateVolunteers(volunteers)
};

export const releaseRequestsFromVolunteer = (
  requestId: string,
  volunteerIds: Array<string>,
) => {
  const request = removeVolunteersFromRequest(requestId, volunteerIds);
  const volunteers = removeRequestFromVolunteers(requestId, volunteerIds);

  // actions.updateVolunteer(volunteer)
  // actions.updateRequests(requests)
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

export const addVolunteersToRequest = async (
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

export const addVolunteerToRequests = async (
  volunteerId: string,
  requestIds: Array<string>,
): Promise<RequestData[]> => {
  var requests: RequestData[] = [];
  requestIds.forEach(async (id: string) => {
    var request = await getRequestByID(id);
    if (request instanceof RequestNotExistsError) {
      return null;
    }
    if (!request.assignedVolunteerIds.includes(volunteerId)) {
      request.assignedVolunteerIds.push(volunteerId);
    }
    await writeRequestData(request);
    requests.push(request);
  });
  return requests;
};

export const removeVolunteerFromRequests = async (
  volunteerId: string,
  requestIds: Array<string>,
): Promise<RequestData[]> => {
  var requests: RequestData[] = [];
  requestIds.forEach(async (id: string) => {
    var request = await getRequestByID(id);
    if (request instanceof RequestNotExistsError) {
      return null;
    }

    const index = request.assignedVolunteerIds.indexOf(volunteerId);
    if (index !== -1) {
      request.assignedVolunteerIds.splice(index, 1);
    }

    await writeRequestData(request);
    requests.push(request);
  });
  return requests;
};

export const removeVolunteersFromRequest = async (
  requestId: string,
  volunteerIds: Array<string>,
): Promise<RequestData | null> => {
  var request = await getRequestByID(requestId);
  if (request instanceof RequestNotExistsError) {
    return null;
  }

  volunteerIds.forEach((id: string) => {
    const index = request.assignedVolunteerIds.indexOf(id);
    if (index !== -1) {
      request.assignedVolunteerIds.splice(index, 1);
    }
  });

  await writeRequestData(request);
  return request;
};
