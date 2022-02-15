import * as Types from '../types/app';

export interface Action {
  payload: any;
  type: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface RequestForm {
  name: string;
  phoneNumber: string;
  info: string;
  location: Location;
  deliveryTime: Date;
  notes: string;
}

export interface AppInitialState {
  isAppLoading: boolean;
  requestForm: RequestForm;
  showCurrentLocation: boolean;
}

export const initialState: AppInitialState = {
  isAppLoading: false,
  requestForm: {
    name: '',
    phoneNumber: '',
    info: '',
    location: { latitude: 0, longitude: 0 },
    deliveryTime: '',
    notes: '',
  },
  showCurrentLocation: false,
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
    default:
      return state;
  }
};
export default reducer;
