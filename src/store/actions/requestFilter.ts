import * as Types from '../types/requestFilter';

const updateRequestFilterInfo = (payload: string) => ({
  type: Types.UPDATE_REQUEST_FILTER,
  payload,
});

export { updateRequestFilterInfo };
