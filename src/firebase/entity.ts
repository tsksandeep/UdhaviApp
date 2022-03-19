// This file contains common functions between requests and volunteers
// to avoid cyclic dependencies

import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  VolunteerNotExistsError,
  RequestNotExistsError,
} from '../errors/errors';
import { RequestData, VolunteerData } from './model';
import { requestsRef, volunteersRef } from './ref';

export const getRequestByID = async (id: string): Promise<any> => {
  const docSnapshot = await getDoc(doc(requestsRef, id));
  const request = docSnapshot.data();
  if (!docSnapshot.exists() || !request?.name || !request?.phoneNumber) {
    return new RequestNotExistsError(`request ${id} does not exists`);
  }
  return request as RequestData;
};

export const getVolunteerByID = async (id: string): Promise<any> => {
  if (!id) {
    return {};
  }

  const docSnapshot = await getDoc(doc(volunteersRef, id));
  const volunteer = docSnapshot.data();
  if (!docSnapshot.exists() || !volunteer?.name || !volunteer?.phoneNumber) {
    return new VolunteerNotExistsError(`volunteer ${id} does not exists`);
  }

  return {
    id: id,
    name: volunteer.name,
    phoneNumber: volunteer.phoneNumber,
    zone: volunteer.zone,
    type: volunteer.type,
    status: volunteer.status,
    lastActive: volunteer.lastActive,
    assignedRequestIds: volunteer.assignedRequestIds,
  };
};

export const writeRequestData = async (requestData: RequestData) => {
  await setDoc(doc(requestsRef, requestData.id), requestData);
};

export const writeVolunteerData = async (volunteerData: VolunteerData) => {
  await setDoc(doc(volunteersRef, volunteerData.id), {
    id: volunteerData.id,
    name: volunteerData.name,
    phoneNumber: volunteerData.phoneNumber,
    zone: volunteerData.zone,
    type: volunteerData.type,
    status: volunteerData.status,
    lastActive: volunteerData.lastActive,
    assignedRequestIds: volunteerData.assignedRequestIds,
  });
};

export const addRequestToVolunteers = async (
  requestId: string,
  volunteerIds: Array<string>,
): Promise<VolunteerData[]> => {
  var volunteers: VolunteerData[] = [];
  volunteerIds.forEach(async (id: string) => {
    var volunteer = await getVolunteerByID(id);
    if (volunteer instanceof VolunteerNotExistsError) {
      return null;
    }
    if (!volunteer.assignedRequestIds.includes(requestId)) {
      volunteer.assignedRequestIds.push(requestId);
    }
    await writeVolunteerData(volunteer);
    volunteers.push(volunteer);
  });
  return volunteers;
};

export const removeRequestFromVolunteers = async (
  requestId: string,
  volunteerIds: Array<string>,
): Promise<VolunteerData[]> => {
  var volunteers: VolunteerData[] = [];
  volunteerIds.forEach(async (id: string) => {
    var volunteer = await getVolunteerByID(id);
    if (volunteer instanceof VolunteerNotExistsError) {
      return null;
    }

    const index = volunteer.assignedRequestIds.indexOf(requestId);
    if (index !== -1) {
      volunteer.assignedRequestIds.splice(index, 1);
    }

    await writeVolunteerData(volunteer);
    volunteers.push(volunteer);
  });
  return volunteers;
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
