import {
  setDoc,
  getDocs,
  query,
  doc,
  where,
  orderBy,
} from 'firebase/firestore';

import { VolunteerData } from './model';
import { volunteersRef } from './ref';

export const writeVolunteerData = async (volunteerData: VolunteerData) => {
  await setDoc(doc(volunteersRef, volunteerData.id), {
    id: volunteerData.id,
    name: volunteerData.name,
    phoneNumber: volunteerData.phoneNumber,
    zone: volunteerData.zone,
    type: volunteerData.type,
    status: volunteerData.status,
    lastActive: volunteerData.lastActive,
    assignedRequests: volunteerData.assignedRequests,
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
