import * as Types from '../types/requestForm';

export interface Action {
  payload: any;
  type: string;
}

export interface RequestInitialState {}

export const initialState: RequestInitialState = {};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    default:
      return state;
  }
};
export default reducer;
