import * as Types from '../types/requestFilter';

export interface Action {
  payload: any;
  type: string;
}

export interface RequestFilter {
  value: string;
  category: string;
}

export interface RequestFilterInitialState {
  filter: RequestFilter;
}

export const initialState: RequestFilterInitialState = {
  filter: {
    value: '',
    category: '',
  },
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_REQUEST_FILTER:
      return { ...state, filter: payload };
    default:
      return state;
  }
};

export default reducer;
