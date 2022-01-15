import * as Types from '../types/request';

export interface Action {
  payload: any;
  type: string;
}

export interface RequestInitialState {
  requestForm: {
    name: string;
    phoneNumber: string;
    info: string;
    location: string;
    deliveryTime: string;
    notes: string;
  };
}

export const initialState: RequestInitialState = {
  requestForm: {
    name: '',
    phoneNumber: '',
    info: '',
    location: '',
    deliveryTime: '',
    notes: '',
  },
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_REQUEST_FORM:
      return { ...state, requestForm: payload };
    default:
      return state;
  }
};
export default reducer;
