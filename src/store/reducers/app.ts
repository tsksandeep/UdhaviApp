import * as Types from '../types/app';
import { RequestForm, UserData, Action } from './modal/app.modal';

export interface AppInitialState {
  isAppLoading: boolean;
  requestForm: RequestForm;
  showCurrentLocation: boolean;
  user: UserData;
  requestList: RequestForm[];
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
  requestList: [],
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
    case Types.UPDATE_REQUEST_LIST:
      return { ...state, requestList: payload };
    default:
      return state;
  }
};
export default reducer;
