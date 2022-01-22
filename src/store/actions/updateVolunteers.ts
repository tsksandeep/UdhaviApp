import * as Types from '../types/updateVolunteers';
import { VolunteersMap } from '../reducers/updateVolunteers';

const updateVolunteers = (payload: VolunteersMap) => ({
  type: Types.UPDATE_VOLUNTEERS,
  payload,
});

export { updateVolunteers };
