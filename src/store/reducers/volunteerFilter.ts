import * as Types from '../types/volunteerFilter';

export interface Action {
  payload: any;
  type: string;
}

export interface VolunteerFilterInitialState {
  volunteerFilter: string;
}

export const initialState: VolunteerFilterInitialState = {
  volunteerFilter: '',
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_VOLUNTEER_FILTER:
      return { ...state, volunteerFilter: payload };
    default:
      return state;
  }
};

export default reducer;
