import {
  setDoc,
  getDocs,
  query,
  doc,
  where,
  orderBy,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

import { VolunteerNotExistsError } from '../errors/errors';
import { RequestsMap } from '../store/reducers/updateRequests';
import { VolunteersMap } from '../store/reducers/updateVolunteers';
import { RequestData, VolunteerData } from './model';
import { volunteersRef } from './ref';
import {
  addVolunteerToRequests,
  removeVolunteerFromRequests,
} from './requests';

export const assignRequestsToVolunteer = async (
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  volunteerId: string,
  requestIds: Array<string>,
) => {
  const newVolunteer = await addRequestsToVolunteer(volunteerId, requestIds);
  if (newVolunteer !== null) {
    volunteers[newVolunteer.id] = newVolunteer;
  }

  const newRequests = await addVolunteerToRequests(volunteerId, requestIds);
  if (newRequests.length > 0) {
    newRequests.forEach((newRequest: RequestData) => {
      requests[newRequest.id] = newRequest;
    });
  }

  actions.updateRequests(requests);
  actions.updateVolunteers(volunteers);
};

export const releaseRequestsFromVolunteer = async (
  actions: any,
  requests: RequestsMap,
  volunteers: VolunteersMap,
  volunteerId: string,
  requestIds: Array<string>,
) => {
  const newVolunteer = await removeRequestsFromVolunteer(
    volunteerId,
    requestIds,
  );
  if (newVolunteer !== null) {
    volunteers[newVolunteer.id] = newVolunteer;
  }

  const newRequests = await removeVolunteerFromRequests(
    volunteerId,
    requestIds,
  );
  if (newRequests.length > 0) {
    newRequests.forEach((newRequest: RequestData) => {
      requests[newRequest.id] = newRequest;
    });
  }

  actions.updateRequests(requests);
  actions.updateVolunteers(volunteers);
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

export const updateRequestData = async (
  id: string,
  data: { [key: string]: any },
) => {
  updateDoc(doc(volunteersRef, id), data);
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
