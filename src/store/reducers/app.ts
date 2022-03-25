import { RequestData, VolunteerData } from '../../firebase/model';
import * as Types from '../types/app';
import {
  RequestForm,
  UserData,
  Action,
  NotificationData,
} from './modal/app.modal';

export interface RequestsMap {
  [id: string]: RequestData;
}

export interface VolunteersMap {
  [id: string]: VolunteerData;
}
export interface AppInitialState {
  isAppLoading: boolean;
  requestForm: RequestForm;
  user: UserData;
  requestsMap: RequestsMap;
  volunteersMap: VolunteersMap;
  requestAddress: string;
  notifications: NotificationData[];
}

export const initialState: AppInitialState = {
  isAppLoading: false,
  requestForm: {
    name: '',
    phoneNumber: '',
    info: '',
    location: { latitude: 0, longitude: 0 },
    deliveryTime: new Date(),
    notes: '',
    requestorPhoneNumber: '',
  },
  user: { name: '', phoneNumber: '', userId: '' },
  requestsMap: {},
  volunteersMap: {},
  requestAddress: '',
  notifications: [],
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.IS_APP_LOADING:
      return { ...state, isAppLoading: payload };
    case Types.CREATE_REQUEST_FORM:
      return { ...state, requestForm: payload };
    case Types.UPDATE_USER_DATA:
      return { ...state, user: payload };
    case Types.UPDATE_REQUESTS_MAP:
      return { ...state, requestsMap: payload };
    case Types.UPDATE_VOLUNTEERS_MAP:
      return { ...state, volunteersMap: payload };
    case Types.UPDATE_REQUEST_ADDRESS:
      return { ...state, requestAddress: payload };
    case Types.UPDATE_NOTIFICATIONS:
      return { ...state, notifications: payload };
    default:
      return state;
  }
};

export default reducer;
