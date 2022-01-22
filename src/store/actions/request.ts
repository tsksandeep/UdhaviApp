import * as Types from '../types/request';
import { RequestForm } from '../reducers/request';

const updateRequestForm = (payload: RequestForm) => ({
  type: Types.CREATE_REQUEST_FORM,
  payload,
});

export { updateRequestForm };
