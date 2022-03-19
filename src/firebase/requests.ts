import {
  getDocs,
  query,
  doc,
  where,
  orderBy,
  updateDoc,
} from 'firebase/firestore';

import { RequestNotExistsError } from '../errors/errors';
import { RequestsMap, VolunteersMap } from '../store/reducers/app';
import { RequestData, VolunteerData } from './model';
import { requestsRef } from './ref';
import {
  addRequestToVolunteers,
  getRequestByID,
  removeRequestFromVolunteers,
  writeRequestData,
} from './entity';

export const assignVolunteersToRequest = async (
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  requestId: string,
  volunteerIds: Array<string>,
) => {
  const newRequest = await addVolunteersToRequest(requestId, volunteerIds);
  if (newRequest !== null) {
    requests[newRequest.id] = newRequest;
  }

  const newVolunteers = await addRequestToVolunteers(requestId, volunteerIds);
  if (newVolunteers.length > 0) {
    newVolunteers.forEach((newVolunteer: VolunteerData) => {
      volunteers[newVolunteer.id] = newVolunteer;
    });
  }

  actions.updateRequests(requests);
  actions.updateVolunteers(volunteers);
};

export const releaseVolunteersFromRequest = async (
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  requestId: string,
  volunteerIds: Array<string>,
) => {
  const newRequest = await removeVolunteersFromRequest(requestId, volunteerIds);
  if (newRequest !== null) {
    requests[newRequest.id] = newRequest;
  }

  const newVolunteers = await removeRequestFromVolunteers(
    requestId,
    volunteerIds,
  );
  if (newVolunteers.length > 0) {
    newVolunteers.forEach((newVolunteer: VolunteerData) => {
      volunteers[newVolunteer.id] = newVolunteer;
    });
  }

  actions.updateRequests(requests);
  actions.updateVolunteers(volunteers);
};

export const updateRequestData = async (
  id: string,
  data: { [key: string]: any },
) => {
  updateDoc(doc(requestsRef, id), data);
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
