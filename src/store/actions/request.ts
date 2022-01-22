import * as Types from '../types/request';

export interface requestForm {
  name: string;
  phoneNumber: string;
  info: string;
  location: string;
  deliveryTime: string;
  notes: string;
}

const updateRequestForm = (payload: requestForm) => ({
  type: Types.CREATE_REQUEST_FORM,
  payload,
});

export { updateRequestForm };
