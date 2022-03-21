export interface UserData {
  userId: string;
  name?: string;
  phoneNumber?: string;
  expoToken?: string;
}

export interface RequestData {
  id: string;
  name: string;
  phoneNumber: string;
  requestorPhoneNumber: string;
  info: string;
  location: LocationType;
  deliveryTime: Date;
  notes: string;
  date: number;
  eta: string;
  status: string;
  message: string;
  category: string;
  assignedTo: string;
  assignedVolunteerIds?: Array<string>;
}

export interface LocationType {
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
  assignedTo: string;
  lastActive: number;
  assignedRequestIds?: Array<string>;
}
