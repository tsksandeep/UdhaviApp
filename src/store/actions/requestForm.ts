import * as Types from '../types/requestForm';
import { RequestForm } from '../reducers/requestForm';

const updateRequestForm = (payload: RequestForm) => ({
  type: Types.CREATE_REQUEST_FORM,
  payload,
});

export { updateRequestForm };
