import {
  setDoc,
  getDocs,
  query,
  doc,
  where,
  orderBy,
  getDoc,
} from 'firebase/firestore';

import { VolunteerNotExistsError } from '../errors/errors';
import { VolunteerData } from './model';
import { volunteersRef } from './ref';

export const assignRequestsToVolunteer = (
  volunteerId: string,
  requestIds: Array<string>,
) => {
  const volunteer = updateVolunteerWithNewRequests(volunteerId, requestIds);
  if (!volunteer) {
    return;
  }

  // Update action with new volunteer data
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
  const docSnapshot = await getDoc(doc(volunteersRef, id));
  const volunteer = docSnapshot.data();
  if (!docSnapshot.exists() || !volunteer?.name || !volunteer?.phoneNumber) {
    return new VolunteerNotExistsError(`volunteer ${id} does not exists`);
  }

  return {
    userId: id,
    name: volunteer.name,
    phoneNumber: volunteer.phoneNumber,
    zone: volunteer.zone,
    type: volunteer.type,
    status: volunteer.status,
    lastActive: volunteer.lastActive,
    assignedRequestIds: volunteer.assignedRequestIds,
  };
};

export const updateVolunteerWithNewRequests = async (
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
