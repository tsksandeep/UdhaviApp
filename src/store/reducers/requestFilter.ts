import * as Types from '../types/requestFilter';

export interface Action {
  payload: any;
  type: string;
}

export interface RequestFilterInitialState {
  status: string;
  name: string;
  category: string;
}

export const initialState: RequestFilterInitialState = {
  status: 'all',
  name: 'all',
  category: 'all',
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_STATUS_FILTER:
      return { ...state, status: payload };
    case Types.UPDATE_CATEGORY_FILTER:
      return { ...state, category: payload };
    case Types.UPDATE_NAME_FILTER:
      return { ...state, name: payload };
    default:
      return state;
  }
};

export default reducer;
