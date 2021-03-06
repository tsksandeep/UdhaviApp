import { VolunteerNotExistsError } from '../errors/errors';
import { RequestData, VolunteerData } from './model';
import { volunteersRef } from './ref';
import {
  addVolunteerToRequests,
  getVolunteerByID,
  removeVolunteerFromRequests,
  writeVolunteerData,
} from './entity';

export const assignRequestsToVolunteer = async (
  actions: any,
  requests: Map<string, RequestData>,
  volunteers: Map<string, VolunteerData>,
  volunteerId: string,
  requestIds: Array<string>,
) => {
  const newVolunteer = await addRequestsToVolunteer(volunteerId, requestIds);
  if (newVolunteer !== null) {
    volunteers.set(newVolunteer.id, newVolunteer);
  }

  const newRequests = await addVolunteerToRequests(volunteerId, requestIds);
  if (newRequests.length > 0) {
    newRequests.forEach((newRequest: RequestData) => {
      requests.set(newRequest.id, newRequest);
    });
  }

  actions.updateRequestsMap(requests);
  actions.updateVolunteersMap(volunteers);
};

export const releaseRequestsFromVolunteer = async (
  actions: any,
  requests: Map<string, RequestData>,
  volunteers: Map<string, VolunteerData>,
  volunteerId: string,
  requestIds: Array<string>,
) => {
  const newVolunteer = await removeRequestsFromVolunteer(
    volunteerId,
    requestIds,
  );
  if (newVolunteer !== null) {
    volunteers.set(newVolunteer.id, newVolunteer);
  }

  const newRequests = await removeVolunteerFromRequests(
    volunteerId,
    requestIds,
  );
  if (newRequests.length > 0) {
    newRequests.forEach((newRequest: RequestData) => {
      requests.set(newRequest.id, newRequest);
    });
  }

  actions.updateRequestsMap(requests);
  actions.updateVolunteersMap(volunteers);
};

export const updateVolunteerData = async (
  id: string,
  data: { [key: string]: any },
) => {
  volunteersRef.doc(id).update(data);
};

export const getAllVolunteers = async (): Promise<any> => {
  return (await volunteersRef.orderBy('lastActive').get()).docs;
};

export const getVolunteersByZone = async (zone: string): Promise<any> => {
  return (
    await volunteersRef.where('zone', '==', zone).orderBy('lastActive').get()
  ).docs;
};

export const addRequestsToVolunteer = async (
  volunteerId: string,
  requestIds: Array<string>,
): Promise<VolunteerData | null> => {
  var volunteer = await getVolunteerByID(volunteerId);
  if (volunteer instanceof VolunteerNotExistsError) {
    return null;
  }

  requestIds.forEach((id: string) => {
    if (!volunteer.assignedRequestIds.includes(id)) {
      volunteer.assignedRequestIds.push(id);
    }
  });

  await writeVolunteerData(volunteer);
  return volunteer;
};

export const removeRequestsFromVolunteer = async (
  volunteerId: string,
  requestIds: Array<string>,
): Promise<VolunteerData | null> => {
  var volunteer = await getVolunteerByID(volunteerId);
  if (volunteer instanceof VolunteerNotExistsError) {
    return null;
  }

  requestIds.forEach((id: string) => {
    const index = volunteer.assignedRequestIds.indexOf(id);
    if (index !== -1) {
      volunteer.assignedRequestIds.splice(index, 1);
    }
  });

  await writeVolunteerData(volunteer);
  return volunteer;
};
