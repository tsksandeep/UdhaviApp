import * as Types from '../types/volunteerSelection';

export interface Action {
  payload: any;
  type: string;
}

export interface VolunteerSelectionInitialState {
  volunteerSelected: string;
}

export const initialState: VolunteerSelectionInitialState = {
  volunteerSelected: '',
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_VOLUNTEER_SELECTION:
      return { ...state, volunteerSelected: payload };
    default:
      return state;
  }
};
export default reducer;
