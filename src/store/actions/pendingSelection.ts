import * as Types from '../types/volunteerSelection';

const updateVolunteerSelection = (payload: string) => ({
  type: Types.UPDATE_VOLUNTEER_SELECTION,
  payload,
});

export { updateVolunteerSelection };
