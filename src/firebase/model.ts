export interface UserData {
  userId: string;
  name?: string;
  phoneNumber?: string;
}

export interface RequestData {
  id: string;
  name: string;
  phoneNumber: string;
  info: string;
  location: string;
  deliveryTime: string;
  notes: string;
  date: number;
  assignedVolunteers: Array<VolunteerData>;
}

export interface VolunteerData {
  id: string;
  name: string;
  phoneNumber: string;
  zone: string;
  type: string;
  status: string;
  lastActive: number;
  assignedRequests: Array<RequestData>;
}
