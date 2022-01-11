import * as Types from "../types/app";

export interface Action {
  payload: any;
  type: string;
}

export interface AppInitialState {
  isAppLoading: boolean;
}

export const initialState: AppInitialState = {
  isAppLoading: false,
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.IS_APP_LOADING:
      return { ...state, isAppLoading: payload };
    default:
      return state;
  }
};
export default reducer;
