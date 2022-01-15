import * as Types from '../types/request';

const updateRequestForm = (payload: boolean) => ({
  type: Types.UPDATE_REQUEST_FORM,
  payload,
});

export { updateRequestForm };
