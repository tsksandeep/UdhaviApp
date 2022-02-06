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
  location: Location;
  deliveryTime: string;
  notes: string;
  date: number;
  eta: string;
  status: string;
  message: string;
  category: string;
  assignedTo: string;
  assignedVolunteerIds?: Array<string>;
}

interface Location {
  longitude: number;
  latitude: number;
}

export interface VolunteerData {
  id: string;
  name: string;
  phoneNumber: string;
  zone: string;
  type: string;
  status: string;
  lastActive: number;
  assignedRequestIds?: Array<string>;
}
