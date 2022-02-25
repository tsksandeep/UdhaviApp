import { RequestData, VolunteerData } from '../../firebase/model';
import * as Types from '../types/app';
import { RequestForm, UserData, Action } from './modal/app.modal';

export interface RequestsMap {
  [id: string]: RequestData;
}

export interface VolunteersMap {
  [id: string]: VolunteerData;
}
export interface AppInitialState {
  isAppLoading: boolean;
  requestForm: RequestForm;
  showCurrentLocation: boolean;
  user: UserData;
  requestsMap: RequestsMap;
  volunteersMap: VolunteersMap;
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
  },
  showCurrentLocation: false,
  user: { name: '', phoneNumber: '', userId: '' },
  requestsMap: {},
  volunteersMap: {},
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.IS_APP_LOADING:
      return { ...state, isAppLoading: payload };
    case Types.CREATE_REQUEST_FORM:
      return { ...state, requestForm: payload };
    case Types.SHOW_CURRENT_LOCATION:
      return { ...state, showCurrentLocation: payload };
    case Types.UPDATE_USER_DATA:
      return { ...state, user: payload };
    case Types.UPDATE_REQUESTS_MAP:
      return { ...state, requestsMap: payload };
    case Types.UPDATE_VOLUNTEERS_MAP:
      return { ...state, volunteersMap: payload };
    default:
      return state;
  }
};

export default reducer;
