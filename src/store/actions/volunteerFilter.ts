import * as Types from '../types/volunteerFilter';

const updateVolunteerFilterInfo = (payload: string) => ({
  type: Types.UPDATE_VOLUNTEER_FILTER,
  payload,
});

export { updateVolunteerFilterInfo };
