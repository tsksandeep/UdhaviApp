import { RequestFilter } from '../reducers/requestFilter';
import * as Types from '../types/requestFilter';

const updateRequestFilterInfo = (payload: RequestFilter) => ({
  type: Types.UPDATE_REQUEST_FILTER,
  payload,
});

export { updateRequestFilterInfo };
