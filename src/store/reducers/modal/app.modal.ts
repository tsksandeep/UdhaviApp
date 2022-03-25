export interface Action {
  payload: any;
  type: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface UserData {
  name: string;
  phoneNumber: string;
  userId: string;
}

export interface RequestForm {
  name: string;
  phoneNumber?: string;
  info: string;
  location: Location;
  deliveryTime: Date;
  notes: string;
  requestorPhoneNumber: string;
  date?: Date;
  status?: string;
  category?: string;
  id?: string;
}

export interface NotificationData {
  id: string;
  body: string;
  title: string;
  category: string;
  timeStamp: number;
}
