import * as Types from '../types/requestSelection';

export interface Action {
  payload: any;
  type: string;
}

export interface RequestSelectionInitialState {
  requestSelected: string;
}

export const initialState: RequestSelectionInitialState = {
  requestSelected: '',
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_REQUEST_SELECTION:
      return { ...state, requestSelected: payload };
    default:
      return state;
  }
};
export default reducer;
