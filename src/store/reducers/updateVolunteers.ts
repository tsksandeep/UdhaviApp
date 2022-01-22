import { VolunteerData } from '../../firebase/model';
import * as Types from '../types/updateVolunteers';

export interface Action {
  payload: any;
  type: string;
}

export interface VolunteersMap {
  [id: string]: VolunteerData;
}

export interface VolunteersInitialState {
  volunteers: VolunteersMap;
}

export const initialState: VolunteersInitialState = {
  volunteers: {},
};

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.UPDATE_VOLUNTEERS:
      return { ...state, volunteers: payload };
    default:
      return state;
  }
};

export default reducer;
