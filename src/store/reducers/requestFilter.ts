import * as Types from '../types/requestFilter';

export interface Action {
  payload: any;
  type: string;
}

export interface RequestFilterInitialState {
  requestFilter: string;
}

export const initialState: RequestFilterInitialState = {
  requestFilter: '',
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_REQUEST_FILTER:
      return { ...state, requestFilter: payload };
    default:
      return state;
  }
};

export default reducer;
