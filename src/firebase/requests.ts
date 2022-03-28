import { RequestNotExistsError } from '../errors/errors';
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
  requests: Map<string, RequestData>,
  volunteers: Map<string, VolunteerData>,
  requestId: string,
  volunteerIds: Array<string>,
) => {
  const newRequest = await addVolunteersToRequest(requestId, volunteerIds);
  if (newRequest !== null) {
    requests.set(newRequest.id, newRequest);
  }

  const newVolunteers = await addRequestToVolunteers(requestId, volunteerIds);
  if (newVolunteers.length > 0) {
    newVolunteers.forEach((newVolunteer: VolunteerData) => {
      volunteers.set(newVolunteer.id, newVolunteer);
    });
  }

  actions.updateRequestsMap(requests);
  actions.updateVolunteersMap(volunteers);
};

export const releaseVolunteersFromRequest = async (
  actions: any,
  requests: Map<string, RequestData>,
  volunteers: Map<string, VolunteerData>,
  requestId: string,
  volunteerIds: Array<string>,
) => {
  const newRequest = await removeVolunteersFromRequest(requestId, volunteerIds);
  if (newRequest !== null) {
    requests.set(newRequest.id, newRequest);
  }

  const newVolunteers = await removeRequestFromVolunteers(
    requestId,
    volunteerIds,
  );
  if (newVolunteers.length > 0) {
    newVolunteers.forEach((newVolunteer: VolunteerData) => {
      volunteers.set(newVolunteer.id, newVolunteer);
    });
  }

  actions.updateRequestsMap(requests);
  actions.updateVolunteersMap(volunteers);
};

export const updateRequestData = async (
  id: string,
  data: { [key: string]: any },
) => {
  requestsRef.doc(id).update(data);
};

export const getAllRequests = async (): Promise<any> => {
  return (await requestsRef.orderBy('date').get()).docs;
};

export const getRequestsByPhoneNumber = async (
  phoneNumber: string,
): Promise<any> => {
  return (
    await requestsRef
      .where('phoneNumber', '==', phoneNumber)
      .orderBy('date')
      .get()
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
