import * as Types from '../types/updateRequests';
import { RequestsMap } from '../reducers/updateRequests';

const updateRequests = (payload: RequestsMap) => ({
  type: Types.UPDATE_REQUESTS,
  payload,
});

export { updateRequests };
