import { RequestData } from '../../firebase/model';
import * as Types from '../types/updateRequests';

export interface Action {
  payload: any;
  type: string;
}

export interface RequestsMap {
  [id: string]: RequestData;
}

export interface RequestsInitialState {
  requests: RequestsMap;
}

export const initialState: RequestsInitialState = {
  requests: {},
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_REQUESTS:
      return { ...state, requests: payload };
    default:
      return state;
  }
};

export default reducer;
